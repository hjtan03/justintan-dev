import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { featuredVideos, personalNotes, youtubeChannelUrl } from "@/lib/data/personal";

const asideOffset = { "--aside-offset": "0.33rem" } as React.CSSProperties;

export function BeyondCode() {
  return (
    <section id="beyond-code" aria-labelledby="beyond-code-heading" className="page section row" style={asideOffset}>
      <div className="aside">
        <h2 id="beyond-code-heading">Beyond code</h2>
      </div>
      <div className="main space-y-8">
        <p>{personalNotes.violin}</p>
        {featuredVideos.map((video) => (
          <YouTubeEmbed key={video.id} video={video} />
        ))}
        {youtubeChannelUrl && (
          <p className="text-compact">
            <a href={youtubeChannelUrl} className="nav-link" target="_blank" rel="noopener noreferrer">
              YouTube channel
            </a>
          </p>
        )}
        <p>{personalNotes.oneLiner}</p>
      </div>
    </section>
  );
}
