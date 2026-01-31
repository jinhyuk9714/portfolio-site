import { profile } from "@/data/profile";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
      <div className="absolute inset-0 bg-hero-grid bg-grid-sm opacity-60" aria-hidden />
      <div className="relative z-10 hero-content flex flex-col items-center text-center max-w-2xl mx-auto">
        {profile.profileImageUrl ? (
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden mb-8 ring-1 ring-surface-border animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            <Image
              src={profile.profileImageUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="112px"
              priority
              unoptimized
            />
          </div>
        ) : null}
        {profile.role ? (
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            {profile.role}
          </p>
        ) : null}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink-primary animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          {profile.name}
        </h1>
        <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
        <p className="mt-6 text-lg sm:text-xl text-ink-secondary max-w-lg animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          {profile.headline}
        </p>
        {profile.bio ? (
          <p className="mt-5 text-sm text-ink-tertiary leading-relaxed max-w-lg animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            {profile.bio}
          </p>
        ) : null}
        {profile.keywords?.length ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: "0.4s" }}>
            {profile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 text-xs font-medium rounded-full bg-surface-elevated/80 text-ink-secondary border border-surface-border"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : null}
        <div
          className="mt-20 flex flex-col items-center gap-3 text-ink-tertiary animate-fade-in opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: "0.7s" }}
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent/40 via-surface-border to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
