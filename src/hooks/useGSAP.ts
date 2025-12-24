'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPAnimation<T extends HTMLElement>(
  animation: (element: T, ctx: gsap.Context) => void
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      if (ref.current) {
        animation(ref.current, ctx);
      }
    }, ref);

    return () => ctx.revert();
  }, [animation]);

  return ref as RefObject<T | null>;
}

export function useScrollAnimation<T extends HTMLElement>(
  animation: (element: T) => gsap.core.Tween | gsap.core.Timeline
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const ctx = gsap.context(() => {
      animation(element);
    }, element);

    return () => ctx.revert();
  }, [animation]);

  return ref as RefObject<T | null>;
}
