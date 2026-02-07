import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  // -----------------------------
  // PINCH ZOOM (2 fingers)
  // -----------------------------
  const lastDistance = useRef<number | null>(null);

  function handlePinchMove(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (lastDistance.current !== null) {
        const delta = distance - lastDistance.current;
        setScale((s) => Math.min(3, Math.max(1, s + delta / 200)));
      }
      lastDistance.current = distance;
    }
  }

  function handlePinchEnd() {
    lastDistance.current = null;
  }

  // -----------------------------
  // SWIPE NAVIGATION (1 finger)
  // -----------------------------
  const swipeStartX = useRef(0);
  const swipeEndX = useRef(0);

  function handleSwipeStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      swipeStartX.current = e.touches[0].clientX;
    }
  }

  function handleSwipeMove(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      swipeEndX.current = e.touches[0].clientX;
    }
  }

  function handleSwipeEnd() {
    const delta = swipeEndX.current - swipeStartX.current;

    if (Math.abs(delta) > 70 && scale === 1) {
      if (delta > 0) {
        onChange(index === 0 ? images.length - 1 : index - 1);
      } else {
        onChange(index === images.length - 1 ? 0 : index + 1);
      }
    }

    swipeStartX.current = 0;
    swipeEndX.current = 0;
  }

  // -----------------------------
  // IMAGE PRELOAD (next + prev)
  // -----------------------------
  useEffect(() => {
    const preload = (src?: string) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };

    preload(images[index]);
    preload(images[index + 1] ?? images[0]);
    preload(images[index - 1] ?? images[images.length - 1]);
  }, [index, images]);

  return (
    <div className="fixed inset-0 z-[999] bg-black/90" onClick={onClose}>
      {/* CLOSE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-[1000] text-white text-2xl"
      >
        ✕
      </button>

      {/* IMAGE VIEWER */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          handleSwipeStart(e);
        }}
        onTouchMove={(e) => {
          handleSwipeMove(e);
          handlePinchMove(e);
        }}
        onTouchEnd={() => {
          handleSwipeEnd();
          handlePinchEnd();
        }}
        onDoubleClick={() => setScale(1)}
      >
        <Image
          src={images[index]}
          alt=""
          fill
          className="object-contain transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        />

        {/* DESKTOP ARROWS */}
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
