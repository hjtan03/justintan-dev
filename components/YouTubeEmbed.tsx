import type { Video } from "@/lib/data/personal";

export function YouTubeEmbed({ video }: { video: Video }) {
  return (
    <figure>
      <div className="aspect-video w-full overflow-hidden rounded-[3px] bg-rule">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          className="block h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-2 font-sans text-meta text-muted">
        {video.title}
        {video.location && `, ${video.location}`}
        {video.year && ` (${video.year})`}
      </figcaption>
    </figure>
  );
}
