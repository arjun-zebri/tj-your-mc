"use client";

import { useEffect, useRef, useState } from "react";

import { PauseMark, PlayMark } from "@/components/icons";

/**
 * The signature element. Hear him before you read him.
 *
 * A couple deciding between four MCs can hear the difference in eight seconds,
 * and nobody in this category does it because nobody in this category has
 * anything worth hearing. This is where the boldness gets spent, which is why
 * it owns the only amber on the screen.
 */
export function AudioPlayer({
  src,
  durationLabel,
  label,
}: {
  src: string;
  durationLabel: string;
  label: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function onTime() {
      if (!audio || !audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    function onEnded() {
      setPlaying(false);
      setProgress(0);
    }

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // Autoplay policies or a missing file. Leave the control in its idle
      // state rather than showing a spinner that never resolves.
      setPlaying(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        onClick={toggle}
        // The control is icon only, so it carries its own name. It also states
        // what it is going to do, not just what it is.
        aria-label={playing ? `Pause ${label}` : `Play ${label}, ${durationLabel}`}
        className="group relative grid size-16 shrink-0 place-items-center rounded-full border border-warmlight/40 text-warmlight transition-colors duration-200 hover:border-warmlight hover:bg-warmlight/10"
      >
        {/* Progress sits on the ring itself rather than as a separate bar. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-1px] rounded-full"
          style={{
            background: `conic-gradient(var(--color-warmlight) ${progress}%, transparent ${progress}%)`,
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          }}
        />
        {playing ? (
          <PauseMark className="size-6" />
        ) : (
          <PlayMark className="size-6 translate-x-px" />
        )}
      </button>

      <div>
        <p className="font-[family-name:var(--font-display)] text-lg text-chalk">
          Hear {durationLabel}
        </p>
        {/* State is announced in words, never by colour alone. */}
        <p className="text-[0.95rem] text-dust" aria-live="polite">
          {playing ? "Playing" : "Thirty seconds of me on the mic."}
        </p>
      </div>
    </div>
  );
}
