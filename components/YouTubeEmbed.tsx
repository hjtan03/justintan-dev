import type { Video } from "@/lib/data/personal";

export function YouTubeEmbed({ video }: { video: Video }) {
  return (
    <figure>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.title}
        width="560"
        height="315"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <figcaption>
        {video.title}
        {video.location && `, ${video.location}`}
        {video.year && ` (${video.year})`}
      </figcaption>
    </figure>
  );
}
