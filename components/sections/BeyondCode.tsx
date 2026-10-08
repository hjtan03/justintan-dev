import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { featuredVideos, personalNotes, youtubeChannelUrl } from "@/lib/data/personal";

export function BeyondCode() {
  return (
    <section id="beyond-code" aria-labelledby="beyond-code-heading">
      <h2 id="beyond-code-heading">Beyond code</h2>
      <p>{personalNotes.violin}</p>
      {featuredVideos.map((video) => (
        <YouTubeEmbed key={video.id} video={video} />
      ))}
      {youtubeChannelUrl && (
        <p>
          <a href={youtubeChannelUrl}>YouTube channel</a>
        </p>
      )}
      <p>{personalNotes.oneLiner}</p>
    </section>
  );
}
