"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/data/personal";

/**
 * YouTube facade: the poster and a play control until the reader asks for
 * the video, then the real player with autoplay so one click still plays.
 * The player iframe alone was most of the page's weight.
 */
export function YouTubeEmbed({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // Keyboard users activated a button that is now gone; hand focus to the player.
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  const poster = (name: string) => `https://i.ytimg.com/vi/${video.id}/${name}.jpg`;

  return (
    <figure>
      <div className="aspect-video w-full overflow-hidden rounded-[3px] bg-rule">
        {playing ? (
          <iframe
            ref={frame}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="block h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-facade" onClick={() => setPlaying(true)} aria-label={`Play video: ${video.title}`}>
            {/* The 4:3 thumbnails carry letterbox bars; object-fit: cover crops them away. */}
            <img
              src={poster("hqdefault")}
              srcSet={`${poster("hqdefault")} 480w, ${poster("sddefault")} 640w, ${poster("maxresdefault")} 1280w`}
              sizes="(min-width: 900px) 37rem, 100vw"
              width={1280}
              height={720}
              alt=""
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // A missing larger size falls back to the one every video has.
                e.currentTarget.removeAttribute("srcset");
                e.currentTarget.src = poster("hqdefault");
              }}
            />
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 font-sans text-meta text-text-muted">
        {video.title}
        {video.location && `, ${video.location}`}
        {video.year && ` (${video.year})`}
      </figcaption>
    </figure>
  );
}
