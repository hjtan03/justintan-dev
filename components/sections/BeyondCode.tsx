import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { featuredVideos, personalNotes, youtubeChannelUrl } from "@/lib/data/personal";

export function BeyondCode() {
  return (
    <section id="beyond-code" aria-labelledby="beyond-code-heading" className="column pb-20 sm:pb-24">
      <h2 id="beyond-code-heading" className="text-section">
        Beyond code
      </h2>
      <div className="mt-8 space-y-8">
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
