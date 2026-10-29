"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  errorId?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      iconLeft,
      iconRight,
      fullWidth = true,
      className,
      id,
      type = "text",
      disabled,
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
    const effectiveIconLeft = iconLeft || icon;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
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
          {effectiveIconLeft && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sc-ink-soft)] pointer-events-none"
              aria-hidden="true"
            >
              {effectiveIconLeft}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={describedBy}
            className={cn(
              "w-full clay-input",
              "text-[var(--sc-ink)] placeholder-[var(--sc-ink-soft)]",
              "transition-all duration-150",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              effectiveIconLeft && "pl-10",
              iconRight && "pr-10",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sc-ink-soft)] pointer-events-none"
              aria-hidden="true"
            >
              {iconRight}
            </div>
          )}
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

Input.displayName = "Input";

/* ========================================
   TEXTAREA
======================================== */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      className,
      id,
      disabled,
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-body-sm font-medium text-[var(--sc-ink)]",
              "flex items-center gap-1"
            )}
          >
            {label}
            {required && <span className="text-[var(--c-rose)]" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className={cn(
            "w-full clay-input resize-none",
            "text-[var(--sc-ink)] placeholder-[var(--sc-ink-soft)]",
            "transition-all duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";