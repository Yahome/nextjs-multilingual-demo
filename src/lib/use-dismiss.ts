"use client";

import { useEffect, type RefObject } from "react";

/**
 * Closes a popover-style disclosure on Escape (returning focus to its toggle),
 * on a pointer press outside it, and when keyboard focus leaves it.
 */
export function useDismiss(
  open: boolean,
  close: () => void,
  containerRef: RefObject<HTMLElement | null>,
  toggleRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!open || !container) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    }
    function onPointerDown(event: PointerEvent) {
      if (!container?.contains(event.target as Node)) close();
    }
    function onFocusOut(event: FocusEvent) {
      const next = event.relatedTarget as Node | null;
      if (next && !container?.contains(next)) close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("focusout", onFocusOut);
    };
  }, [open, close, containerRef, toggleRef]);
}
