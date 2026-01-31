import { profile } from "@/data/profile";

type LinkItem = { label: string; href: string; external?: boolean };

const links: LinkItem[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.githubUrl, external: true },
  ...(profile.linkedInUrl
    ? [{ label: "LinkedIn", href: profile.linkedInUrl, external: true }]
    : []),
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-surface-border px-6 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" aria-hidden />
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-8">
        <p className="text-sm text-ink-tertiary">
          © {new Date().getFullYear()} · {profile.name}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {links.map((link, i) => (
            <span key={link.label} className="flex items-center gap-6 sm:gap-8">
              {i > 0 ? <span className="w-px h-3 bg-surface-border hidden sm:block" aria-hidden /> : null}
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm font-medium text-ink-secondary hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
