"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { useReducedMotion, getMotionProps } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

type OmittedProps = "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "whileHover" | "whileTap" | "whileFocus" | "whileInView" | "viewport" | "initial" | "animate" | "exit" | "transition";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, OmittedProps> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-[var(--color-rose)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-rose-hover)] active:bg-[var(--color-rose)]/90 shadow-[var(--shadow-rose)]",
  secondary: "bg-[var(--color-teal)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-teal-hover)] active:bg-[var(--color-teal)]/90 shadow-[var(--shadow-teal)]",
  ghost: "bg-transparent hover:bg-[var(--color-border)] active:bg-[var(--color-border-strong)] text-[var(--color-text-primary)] shadow-none",
  destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:opacity-90 active:opacity-100 shadow-[var(--shadow-rose)]",
  outline: "border-2 border-[var(--color-border-strong)] bg-transparent hover:bg-[var(--color-border)] active:bg-[var(--color-border-strong)] text-[var(--color-text-primary)] shadow-none",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-body-sm gap-1.5",
  md: "px-4 py-2 text-body gap-2",
  lg: "px-6 py-3 text-body-lg gap-2.5",
  xl: "px-8 py-4 text-h3 gap-3",
};

const motionProps = {
  whileHover: { scale: 1.015, y: -1 },
  whileTap: { scale: 0.97, y: 0.5 },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      children,
      iconLeft,
      iconRight,
      fullWidth = false,
      className,
      disabled,
      type = "button",
      style,
      onClick,
    },
    ref
  ) => {
    const reduced = useReducedMotion();
    const isDisabled = disabled || loading;
    const reducedProps = getMotionProps(reduced);

    if (reduced) {
      return (
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={cn(
            "inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)]",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ring-offset)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "btn-depth",
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && "w-full",
            className
          )}
          style={style}
          onClick={onClick}
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <>
              {iconLeft && <span className="flex-shrink-0" aria-hidden="true">{iconLeft}</span>}
              {children}
              {iconRight && <span className="flex-shrink-0" aria-hidden="true">{iconRight}</span>}
            </>
          )}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ring-offset)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "btn-depth",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        style={style}
        onClick={onClick}
        {...reducedProps}
        whileHover={motionProps.whileHover}
        whileTap={motionProps.whileTap}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0" aria-hidden="true">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0" aria-hidden="true">{iconRight}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";