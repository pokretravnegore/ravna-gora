export function SectionHeading({ title, light }: { title: string; light?: boolean }) {
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <p className={`type-h1 ${light ? "text-white" : "text-black"}`}>{title}</p>
      <div className={`w-[70px] h-[2px] ${light ? "bg-white" : "bg-black"}`} />
    </div>
  );
}
