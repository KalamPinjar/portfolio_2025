"use client";
import React from "react";

export function SparklesPreview() {
  return (
    <div className="flex flex-col justify-center items-center rounded-md w-full h-[40rem] overflow-hidden">
      <h1 className="z-20 relative font-bold text-black dark:text-white text-3xl md:text-7xl lg:text-9xl text-center">
        Software Developer
      </h1>
      <div className="relative w-[40rem] h-40">
        {/* Gradients */}
        <div className="top-0 absolute inset-x-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm w-3/4 h-[2px]" />
        <div className="top-0 absolute inset-x-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-3/4 h-px" />
        <div className="top-0 absolute inset-x-60 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm w-1/4 h-[5px]" />
        <div className="top-0 absolute inset-x-60 bg-gradient-to-r from-transparent via-sky-500 to-transparent w-1/4 h-px" />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 bg-transparent w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
