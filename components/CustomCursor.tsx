"use client";

import { useEffect, useRef } from "react";

/**
 * A sparkler cursor.
 *
 * A hot core with a tail of cooling embers behind it, throwing off sparks that
 * arc away and burn out as you move. Warm amber against the dark palette, the
 * same light as the specks behind the page.
 *
 * Each ember chases the one in front of it rather than the pointer, which is
 * what stretches the tail on a fast move and gathers it back to a point when
 * the hand stops. Sparks are a recycled pool, so a long session never grows the
 * DOM.
 *
 * Progressive enhancement. The native cursor is only hidden once this has
 * mounted and confirmed a fine pointer with no reduced motion preference, so
 * touch devices, keyboard users, reduced-motion users and a failed script all
 * keep the cursor they expect.
 *
 * Everything is written to transform and opacity inside requestAnimationFrame
 * and never touches React state. Re-rendering on pointermove would cost far
 * more than the effect is worth.
 */

/** Head plus tail. Each is smaller, dimmer and lazier than the one before it. */
const EMBERS = [
  { size: 12, opacity: 1, ease: 1 },
  { size: 10, opacity: 0.75, ease: 0.4 },
  { size: 9, opacity: 0.6, ease: 0.3 },
  { size: 8, opacity: 0.48, ease: 0.24 },
  { size: 7, opacity: 0.38, ease: 0.19 },
  { size: 6, opacity: 0.3, ease: 0.155 },
  { size: 5, opacity: 0.23, ease: 0.13 },
  { size: 4.5, opacity: 0.17, ease: 0.11 },
  { size: 4, opacity: 0.12, ease: 0.095 },
  { size: 3, opacity: 0.08, ease: 0.08 },
];

const PARTICLE_COUNT = 30;
/** Roughly how far the pointer travels between sparks. Lower throws more. */
const EMIT_DISTANCE = 9;

type Particle = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 1 at birth, 0 when spent. */
  life: number;
  decay: number;
  size: number;
};

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const container = containerRef.current;
    if (!container) return;

    // The markup renders back to front so the head paints on top of its own
    // tail. Reverse the query so index 0 is the head again and lines up with
    // EMBERS.
    const embers = Array.from(
      container.querySelectorAll<HTMLElement>(".spark"),
    ).reverse();
    const particleEls = Array.from(
      container.querySelectorAll<HTMLElement>(".spark-particle"),
    );
    if (embers.length === 0) return;

    const root = document.documentElement;
    root.classList.add("cursor-custom");

    // Start off screen so nothing flashes at 0,0 before the first move.
    let pointerX = -200;
    let pointerY = -200;
    let lastEmitX = -200;
    let lastEmitY = -200;
    let visible = false;
    let frame = 0;

    const positions = EMBERS.map(() => ({ x: -200, y: -200 }));
    const particles: Particle[] = particleEls.map((el) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      decay: 0,
      size: 3,
    }));
    let nextParticle = 0;

    const TEXT_FIELDS =
      "input:not([type=hidden]):not([type=button]), textarea, [contenteditable]";
    const INTERACTIVE = 'a[href], button, [role="button"], summary, label';
    /* Sections that paint a light background. Marked in the markup rather than
       sampled from pixels, which would mean reading the canvas every frame. */
    const LIGHT_SURFACE = '[data-surface="light"]';

    function emit(x: number, y: number, hot: boolean) {
      const count = hot ? 2 : 1;
      for (let i = 0; i < count; i += 1) {
        const particle = particles[nextParticle];
        nextParticle = (nextParticle + 1) % particles.length;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.5;
        particle.x = x;
        particle.y = y;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed - 0.3;
        particle.life = 1;
        particle.decay = 0.018 + Math.random() * 0.022;
        particle.size = 1.5 + Math.random() * 2.5;
        particle.el.style.width = `${particle.size}px`;
        particle.el.style.height = `${particle.size}px`;
        particle.el.dataset.hidden = "false";
      }
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        visible = true;
        for (const ember of embers) ember.dataset.hidden = "false";
      }

      const target = event.target as Element | null;
      root.classList.toggle("over-text", Boolean(target?.closest(TEXT_FIELDS)));
      const hot = Boolean(target?.closest(INTERACTIVE));
      root.classList.toggle("cursor-hot", hot);
      root.classList.toggle("cursor-dark", Boolean(target?.closest(LIGHT_SURFACE)));

      // Emit by distance travelled, not per event, so the spark rate matches
      // how fast the hand is actually moving rather than the pointer sample rate.
      const dx = pointerX - lastEmitX;
      const dy = pointerY - lastEmitY;
      if (Math.hypot(dx, dy) > EMIT_DISTANCE) {
        emit(pointerX, pointerY, hot);
        lastEmitX = pointerX;
        lastEmitY = pointerY;
      }
    };

    const onLeave = () => {
      visible = false;
      for (const ember of embers) ember.dataset.hidden = "true";
    };

    const tick = () => {
      let leadX = pointerX;
      let leadY = pointerY;

      for (const [index, position] of positions.entries()) {
        position.x += (leadX - position.x) * EMBERS[index].ease;
        position.y += (leadY - position.y) * EMBERS[index].ease;
        const size = EMBERS[index].size;
        embers[index].style.transform =
          `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`;
        leadX = position.x;
        leadY = position.y;
      }

      for (const particle of particles) {
        if (particle.life <= 0) continue;

        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particle.el.dataset.hidden = "true";
          continue;
        }

        // Slight gravity and drag, so sparks arc and settle rather than
        // flying off in a straight line.
        particle.vy += 0.055;
        particle.vx *= 0.96;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.el.style.transform =
          `translate3d(${particle.x - particle.size / 2}px, ${particle.y - particle.size / 2}px, 0)`;
        particle.el.style.opacity = `${particle.life * particle.life}`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("cursor-custom", "over-text", "cursor-hot", "cursor-dark");
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }, (_, index) => (
        <span key={`p${index}`} className="spark-particle" data-hidden="true" />
      ))}

      {/* Rendered back to front so the burning tip sits on top of its own tail. */}
      {[...EMBERS].reverse().map((ember, index) => {
        const isLead = index === EMBERS.length - 1;
        return (
          <span
            key={`e${index}`}
            className="spark"
            data-hidden="true"
            data-lead={isLead}
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              opacity: ember.opacity,
            }}
          />
        );
      })}
    </div>
  );
}
