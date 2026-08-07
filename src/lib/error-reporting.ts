/**
 * ElegantlyWoven — Application Error Reporting
 * Generic error capture and boundary reporting utility.
 * No external telemetry. Replace with Sentry/Datadog in production.
 */

export type ErrorSeverity = "error" | "warning" | "info";

export interface ErrorContext extends Record<string, unknown> {
  boundary?: string;
  route?: string;
}

/**
 * Captures and logs application errors. Safe to call from both
 * server and client environments. In production, wire this up to
 * your chosen observability provider (Sentry, Datadog, etc.).
 */
export function reportError(
  error: unknown,
  context: ErrorContext = {},
): void {
  if (typeof window === "undefined") {
    // Server-side: structured log
    console.error("[ElegantlyWoven Error]", describeError(error), context);
    return;
  }

  // Client-side: log to console (swap with Sentry.captureException in Phase 5)
  console.error("[ElegantlyWoven Error]", {
    message: getErrorMessage(error),
    stack: error instanceof Error ? error.stack : undefined,
    route: typeof window !== 'undefined' ? window.location.pathname : 'server',
    ...context,
  });
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Response) {
    return `HTTP ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  return String(error);
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack ?? ""}`;
  }
  return String(error);
}
