"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type RippleButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success";
export type RippleButtonSize = "sm" | "md" | "lg" | "icon";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   * @default "default"
   */
  variant?: RippleButtonVariant;
  /**
   * Button size
   * @default "md"
   */
  size?: RippleButtonSize;
  /**
   * Optional icon to display before the button text
   */
  startIcon?: React.ReactNode;
  /**
   * Optional icon to display after the button text
   */
  endIcon?: React.ReactNode;
  /**
   * Whether to show the ripple effect
   * @default true
   */
  ripple?: boolean;
  /**
   * Ripple color (CSS color value)
   * @default "rgba(255, 255, 255, 0.7)"
   */
  rippleColor?: string;
  /**
   * Whether the button is in loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Loading spinner component
   */
  loadingIndicator?: React.ReactNode;
  /**
   * Whether to show full width button
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

/**
 * A customizable button component with ripple animation effects
 */
export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      children,
      variant = "default",
      size = "md",
      startIcon,
      endIcon,
      ripple = true,
      rippleColor,
      isLoading = false,
      loadingIndicator,
      fullWidth = false,
      className,
      onClick,
      disabled,
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<RippleEffect[]>([]);
    const [isPressed, setIsPressed] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const nextId = useRef(0);

    // Handle ripple effect on click
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ripple || disabled || isLoading) return;

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        // Add new ripple
        const id = nextId.current;
        nextId.current += 1;
        setRipples((prev) => [...prev, { x, y, size, id }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1000);

        // Call original onClick handler
        onClick?.(e);
      },
      [onClick, ripple, disabled, isLoading]
    );

    // Get button variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return "bg-blue-600 hover:bg-blue-700 text-white";
        case "secondary":
          return "bg-gray-200 hover:bg-gray-300 text-gray-800";
        case "outline":
          return "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800";
        case "ghost":
          return "bg-transparent hover:bg-gray-100 text-gray-800";
        case "destructive":
          return "bg-red-600 hover:bg-red-700 text-white";
        case "success":
          return "bg-green-600 hover:bg-green-700 text-white";
        default:
          return "bg-gray-800 hover:bg-gray-900 text-white";
      }
    };

    // Get button size styles
    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "text-xs px-3 py-1.5 rounded-md";
        case "lg":
          return "text-base px-6 py-3 rounded-lg";
        case "icon":
          return "p-2 rounded-full aspect-square";
        default: // md
          return "text-sm px-4 py-2 rounded-md";
      }
    };

    // Default loading indicator
    const defaultLoadingIndicator = (
      <svg
        className="mr-2 -ml-1 w-4 h-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <motion.button
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          buttonRef.current = node;
        }}
        className={cn(
          "relative overflow-hidden transition-all duration-200 font-medium flex items-center justify-center",
          getVariantStyles(),
          getSizeStyles(),
          fullWidth ? "w-full" : "",
          isPressed ? "scale-95" : "",
          disabled || isLoading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer",
          className
        )}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
                background: rippleColor || "rgba(255, 255, 255, 0.3)",
              }}
              initial={{ opacity: 0.5, transform: "scale(0)" }}
              animate={{ opacity: 0, transform: "scale(1)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </AnimatePresence>

        {/* Button content */}
        <span className="z-10 flex justify-center items-center gap-2">
          {isLoading && (loadingIndicator || defaultLoadingIndicator)}
          {!isLoading && startIcon && (
            <span className="flex-shrink-0">{startIcon}</span>
          )}
          {children}
          {!isLoading && endIcon && (
            <span className="flex-shrink-0">{endIcon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

RippleButton.displayName = "RippleButton";
