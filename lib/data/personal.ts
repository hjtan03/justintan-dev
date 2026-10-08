export type Video = {
  id: string; // YouTube video ID
  title: string;
  location?: string;
  year?: number;
};

export const featuredVideos: Video[] = [
  {
    id: "KnrmtMz8Eus",
    title: "Korea University Study Abroad 2023",
    location: "Seoul, South Korea",
    year: 2023,
  },
];

/**
 * Null until the backlog is published. Null hides the channel link and
 * renders only the featured embeds above. One-line change later.
 */
export const youtubeChannelUrl: string | null = null;

export const contact = {
  email: "tanjustin03@gmail.com",
  github: "https://github.com/hjtan03",
  linkedin: "https://www.linkedin.com/in/hongmingtan",
};

/**
 * Beyond-code section. Keep it short: this is a conversation starter,
 * not a second resume.
 */
export const personalNotes = {
  violin:
    "I've played violin since I was four. Fourteen years of private study, concertmaster of my high school and all-city orchestras, a Carnegie Hall honors performance in 2019, and roughly 28 solo recitals along the way. I still play: currently second violin in the Northwestern Philharmonia.",
  oneLiner:
    "Also: soccer in high school, casual chess, and a Rubik's cube I solve slowly.",
};
