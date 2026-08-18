export function HeroFallback() {
  return (
    <section className="mx-auto px-4 py-6 bg-[#1a1a1a]" aria-hidden="true">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <div className="main-slider rounded-2xl overflow-hidden relative lg:h-115 sm:h-80 h-56" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="h-36 rounded-2xl" />
          <div className="h-36 rounded-2xl" />
          <div className="h-36 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export function NewsFallback() {
  return <div className="min-h-[420px]" aria-hidden="true" />;
}

export function SectionFallback({ minHeight }: { minHeight: string }) {
  return <div className={minHeight} aria-hidden="true" />;
}
