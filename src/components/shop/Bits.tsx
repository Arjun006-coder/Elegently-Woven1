import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-3 text-3xl font-light sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="shrink-0 border-b border-gold pb-1 text-xs tracking-[0.2em] uppercase transition-colors hover:text-primary"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  compact,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-secondary/60" />
      )}
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-5 sm:px-8",
          compact ? "py-14" : "py-20 sm:py-28",
        )}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-4 max-w-2xl text-4xl font-light sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
        ) : null}
      </div>
    </section>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-secondary text-gold shadow-soft">{icon}</div>
      <h2 className="mt-8 text-2xl font-light">{title}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      {action ? (
        <Link
          to={action.to}
          className="mt-8 rounded-full bg-primary px-7 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}