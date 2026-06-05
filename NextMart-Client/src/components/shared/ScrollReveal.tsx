'use client';

import * as React from 'react';

type Animation = 'up' | 'left' | 'right' | 'fade';

type ScrollRevealProps = {
  children: React.ReactNode;
  animation?: Animation;
  delay?: 0 | 100 | 150 | 200 | 300 | 400 | 500 | 600 | 700;
  threshold?: number;
  className?: string;
};

const animationClass: Record<Animation, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  fade: 'reveal-fade',
};

const delayClass: Record<number, string> = {
  0: '',
  100: 'delay-100',
  150: 'delay-150',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
  500: 'delay-500',
  600: 'delay-600',
  700: 'delay-700',
};

/**
 * Wraps children and triggers a CSS reveal animation when the element
 * enters the viewport. Uses IntersectionObserver (zero dependencies, high performance).
 * 
 * Usage:
 *   <ScrollReveal animation="up" delay={200}>
 *     <ProductCard />
 *   </ScrollReveal>
 */
export const ScrollReveal = (props: ScrollRevealProps): React.ReactNode => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            observer.unobserve(el); // Only animate once
          }
        }
      },
      { threshold: props.threshold ?? 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [props.threshold]);

  const anim = animationClass[props.animation ?? 'up'];
  const delay = props.delay ? delayClass[props.delay] : '';

  return (
    <div ref={ref} className={[anim, delay, props.className].filter(Boolean).join(' ')}>
      {props.children}
    </div>
  );
};

export default ScrollReveal;
