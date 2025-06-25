"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex top-15  h-[calc(100vh-50px)] rounded-2xl flex-col items-center justify-center bg-[#09000e]",
          className
        )}
        {...props}
      >
        <div className="z-10 relative bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_50%)] w-full h-full" />
        <div className="z-20 relative flex justify-center items-center w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="top-[8rem] z-10 relative w-full h-screen">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
