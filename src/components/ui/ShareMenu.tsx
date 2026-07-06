"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneFocus } from "@/lib/camera-focus";
import { shareText, shareUrl } from "@/lib/site";

/** Share the current view: copy deep link, post to X, or native share sheet */
export function ShareMenu({
  focus,
  stepIndex = null,
}: {
  focus: SceneFocus;
  stepIndex?: number | null;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  // Safe to read at render: the popover only exists after a client-side click
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const url = shareUrl(focus, stepIndex);
  const text = shareText(focus, stepIndex);
  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: text, text, url });
      setOpen(false);
    } catch {
      // user cancelled the share sheet
    }
  };

  return (
    <div className="relative">
      {open && (
        <>
          <button
            type="button"
            aria-label="Close share menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
            tabIndex={-1}
          />
          <div className="absolute bottom-full right-0 z-20 mb-2 w-44 rounded-lg border border-white/15 bg-black/90 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={copyLink}
              className="block w-full rounded-md px-3 py-2 text-left text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              {copied ? "Copied ✓" : "Copy link to this view"}
            </button>
            <a
              href={xIntent}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block w-full rounded-md px-3 py-2 text-left text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              Post on X ↗
            </a>
            {canNativeShare && (
              <button
                type="button"
                onClick={nativeShare}
                className="block w-full rounded-md px-3 py-2 text-left text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                More options…
              </button>
            )}
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Share this exact view"
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          open
            ? "bg-white/15 text-white"
            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span aria-hidden className="text-sm leading-none">↗</span>
        Share
      </button>
    </div>
  );
}
