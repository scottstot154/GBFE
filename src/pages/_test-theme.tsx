export default function TestTheme() {
  return (
    <div className="p-8 space-y-4">
      <div className="p-6 rounded bg-background text-foreground">
        bg-background / text-foreground
      </div>
      <div className="p-6 rounded bg-primary text-primary-foreground">
        bg-primary / text-primary-foreground
      </div>
      <div className="p-6 rounded bg-accent text-accent-foreground">
        bg-accent / text-accent-foreground
      </div>
    </div>
  );
}
