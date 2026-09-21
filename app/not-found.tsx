import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col justify-center px-6 py-32 lg:px-12">
      <p className="label text-signal">404</p>
      <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
        Nothing lives here
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-fg-2">
        That URL does not match a page. It may have been renamed, or it may
        never have existed.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">See the work</Link>
        </Button>
      </div>
    </div>
  );
}
