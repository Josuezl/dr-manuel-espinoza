"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type AutoScrollRailProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

const navigationKeys = new Set([
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);

export default function AutoScrollRail({
  ariaLabel,
  children,
  className = "",
  id = "procedures-auto-scroll",
}: AutoScrollRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const running =
    !focused &&
    !dragging &&
    !settling &&
    !reduceMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(preference.matches);

    syncPreference();
    preference.addEventListener("change", syncPreference);

    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !running) return;

    let frame = 0;
    let previousTime = 0;
    let visible = false;
    let documentVisible = !document.hidden;
    let maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    const updateBounds = () => {
      maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      viewport.scrollLeft = Math.min(viewport.scrollLeft, maxScroll);
    };

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(updateBounds) : null;
    resizeObserver?.observe(viewport);
    if (viewport.firstElementChild) {
      resizeObserver?.observe(viewport.firstElementChild);
    }

    const stopTick = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const tick = (time: number) => {
      frame = 0;
      const delta = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;

      if (delta > 0 && maxScroll > 1) {
        const next = viewport.scrollLeft + delta * 0.03;

        if (next >= maxScroll) {
          viewport.scrollLeft = 0;
        } else {
          viewport.scrollLeft = next;
        }
      }

      if (visible && documentVisible) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const startTick = () => {
      if (!frame && visible && documentVisible) {
        previousTime = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (visible) {
                startTick();
              } else {
                stopTick();
              }
            },
            { threshold: 0.08 },
          )
        : null;
    if (intersectionObserver) {
      intersectionObserver.observe(viewport);
    } else {
      visible = true;
      startTick();
    }

    const handleVisibility = () => {
      documentVisible = !document.hidden;
      if (documentVisible) {
        startTick();
      } else {
        stopTick();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTick();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [running]);

  useEffect(() => {
    return () => {
      if (settleTimer.current) {
        clearTimeout(settleTimer.current);
      }
    };
  }, []);

  const settleAfterInteraction = (delay = 1800) => {
    if (settleTimer.current) {
      clearTimeout(settleTimer.current);
    }
    setSettling(true);
    settleTimer.current = setTimeout(() => setSettling(false), delay);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(true);
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(false);
    settleAfterInteraction();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (navigationKeys.has(event.key)) {
      settleAfterInteraction();
    }
  };

  return (
    <>
      <div
        ref={viewportRef}
        id={id}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={() => {
          setDragging(false);
          settleAfterInteraction();
        }}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={handleBlur}
        onWheel={() => settleAfterInteraction()}
        onKeyDown={handleKeyDown}
        className={`${className} ${
          running ? "snap-none" : "snap-x snap-proximity"
        }`}
      >
        {children}
      </div>
    </>
  );
}
