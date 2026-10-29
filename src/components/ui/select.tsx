"use client";

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      placeholder,
      options,
      fullWidth = true,
      iconLeft,
      className,
      id,
      disabled,
      required,
      children,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    const optionsToRender = options?.length
      ? options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))
      : children;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-body-sm font-medium text-[var(--sc-ink)]",
              "flex items-center gap-1"
            )}
          >
            {label}
            {required && <span className="text-[var(--c-rose)]" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sc-ink-soft)] pointer-events-none"
              aria-hidden="true"
            >
              {iconLeft}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={describedBy}
            className={cn(
              "w-full clay-input appearance-none",
              "text-[var(--sc-ink)]",
              "transition-all duration-150",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "pr-10",
              iconLeft && "pl-10",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {optionsToRender}
          </select>
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sc-ink-soft)] pointer-events-none"
            aria-hidden="true"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-body-sm text-[var(--c-rose)] flex items-center gap-1"
          >
            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-body-sm text-[var(--sc-ink-soft)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";