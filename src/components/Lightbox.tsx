import Image from "next/image";
import { useRef, useState } from "react";

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const [scale, setScale] = useState(1);
  const lastDistance = useRef<number | null>(null);

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (lastDistance.current) {
        const delta = dist - lastDistance.current;
        setScale((s) => Math.min(3, Math.max(1, s + delta / 200)));
      }
      lastDistance.current = dist;
    }
  }

  function onTouchEnd() {
    lastDistance.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90"
      onClick={onClose} // clicking backdrop closes
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-[1000] text-white text-2xl"
      >
        ✕
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={() => setScale(1)}
      >
        <Image
          src={images[index]}
          alt=""
          fill
          className="object-contain transition-transform"
          style={{ transform: `scale(${scale})` }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                onChange(index === 0 ? images.length - 1 : index - 1)
              }
              className="absolute left-4 text-white text-3xl z-[1000]"
            >
              ‹
            </button>
            <button
              onClick={() =>
                onChange(index === images.length - 1 ? 0 : index + 1)
              }
              className="absolute right-4 text-white text-3xl z-[1000]"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Lightbox;
