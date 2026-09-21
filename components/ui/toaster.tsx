"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "glass rounded-control! font-sans text-sm text-fg!",
          description: "text-fg-2!",
          actionButton: "bg-accent! text-on-accent!",
        },
      }}
    />
  );
}
