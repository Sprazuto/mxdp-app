"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
  status?: "online" | "offline" | "busy" | "away";
  statusPosition?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
}

const sizeStyles = {
  xs: "h-6 w-6 text-caption",
  sm: "h-8 w-8 text-body-sm",
  md: "h-10 w-10 text-body",
  lg: "h-12 w-12 text-body-lg",
  xl: "h-16 w-16 text-h3",
  "2xl": "h-24 w-24 text-h2",
};

const statusColors = {
  online: "bg-[var(--color-success)]",
  offline: "bg-[var(--color-text-tertiary)]",
  busy: "bg-[var(--color-error)]",
  away: "bg-[var(--color-warning)]",
};

const statusSizes = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-4 w-4",
  "2xl": "h-5 w-5",
};

const statusPositions = {
  "bottom-right": "bottom-0 right-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-left": "top-0 left-0",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      fallback,
      size = "md",
      shape = "circle",
      status,
      statusPosition = "bottom-right",
      className,
      ...props
    },
    ref
  ) => {
    const shapeClass = shape === "circle" ? "rounded-full" : "rounded-[var(--radius-lg)]";
    const sizeClass = sizeStyles[size];
    const statusSizeClass = statusSizes[size];

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden bg-[var(--color-border)]",
          "flex-shrink-0 transition-transform duration-150",
          shapeClass,
          sizeClass,
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[var(--color-border)]">
            {fallback || (
              <svg
                className="h-1/2 w-1/2 text-[var(--color-text-tertiary)]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        )}
        {status && (
          <span
            className={cn(
              "absolute rounded-full border-2 border-[var(--color-bg-elevated)] transition-transform duration-200",
              statusColors[status],
              statusSizes[size],
              statusPositions[statusPosition]
            )}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

/* ========================================
   AVATAR GROUP
======================================== */

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
  spacing?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { children, max = 5, size = "md", shape = "circle", spacing = -8, className, ...props },
    ref
  ) => {
    const kids = Array.isArray(children) ? children : [children];
    const visible = kids.slice(0, max);
    const remaining = kids.length - max;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {visible.map((child, index) => (
          <div
            key={index}
            className="relative z-10"
            style={{ zIndex: visible.length - index, marginLeft: index === 0 ? 0 : spacing }}
          >
            {child}
          </div>
        ))}
        {remaining > 0 && (
          <div
            className={cn(
              "relative z-0 flex items-center justify-center font-medium text-[var(--color-text-secondary)]",
              "bg-[var(--color-bg-elevated)] border-2 border-[var(--color-bg-elevated)]",
              sizeStyles[size],
              shape === "circle" ? "rounded-full" : "rounded-[var(--radius-lg)]"
            )}
            style={{ marginLeft: spacing }}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";