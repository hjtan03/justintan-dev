export type GridProject = {
  slug: string;
  title: string;
  context: string;
  timeframe: string;
  description: string;
  stack: string[];
  /** Source, rendered as "GitHub". */
  repo?: string;
  /** Live site, rendered as its bare hostname. Independent of repo. */
  url?: string;
  /** "selected" gets the full grid treatment; "earlier" is the dense list under it. */
  group: "selected" | "earlier";
  /** People named in the description, linked wherever the name appears. */
  collaborators?: { name: string; href: string }[];
};

/**
 * Compact grid entries. Featured projects live in content/projects/*.mdx.
 * Every claim here is defensible in an interview. Do not add metrics or
 * scope that isn't already stated.
 */
export const gridProjects: GridProject[] = [
  {
    slug: "liftoff",
    title: "Liftoff",
    context: "Side project with Anthony Yalong",
    timeframe: "Oct 2026 – present",
    description:
      "Daily estimation game, live at dailyliftoff.app since October 2026. Five questions a day that you can reason your way toward, with the working shown afterward so you can see where your estimate drifted. React and TypeScript on Vercel, with Supabase Postgres behind a small API. Each guess is re-scored on the server and written once per player, launch and stage, which keeps forged or repeated submissions out of the crowd percentiles. I own the hosting and infrastructure and drove the scoring, daily-reset and archive design; Anthony Yalong built much of the pixel-art game frontend. Covered by 255 unit tests and 15 Playwright end-to-end tests.",
    stack: ["React", "TypeScript", "Vercel", "Supabase", "Playwright"],
    url: "https://dailyliftoff.app",
    repo: "https://github.com/hjtan03/liftoff",
    group: "selected",
    collaborators: [{ name: "Anthony Yalong", href: "https://github.com/yalongwastaken" }],
  },
  {
    slug: "cloud-photo-service",
    title: "Cloud Photo Service",
    context: "Northwestern CS 310",
    timeframe: "2026",
    description:
      "Cloud service built from the infrastructure up on AWS: provisioned IAM users and policies, S3 buckets, an RDS MySQL instance and security groups. A Node and Express service ties S3 storage and RDS together with Rekognition label detection, deployed to Elastic Beanstalk through scripted EB CLI workflows, with Python Lambdas behind API Gateway.",
    stack: [
      "Node.js",
      "Express",
      "AWS S3",
      "RDS MySQL",
      "Rekognition",
      "Elastic Beanstalk",
      "Lambda",
      "API Gateway",
      "IAM",
    ],
    group: "selected",
  },
  {
    slug: "chaiss",
    title: "ChAIss",
    context: "USC senior capstone, 5-person team",
    timeframe: "2024 – 2025",
    description:
      "Android chess app that reads a physical board through the camera and plays or analyzes the position. I planned the project and chose the stack: Java calling Python through Chaquopy, python-chess for move generation, and a Roboflow-trained TFLite model for detection. Because detection isn’t reliable enough to trust blindly, the board has a lock/unlock mode so a misread position can be corrected by hand and relocked. I built the UI, settings, and board theming.",
    stack: ["Java", "Android", "Chaquopy", "python-chess", "TFLite", "Roboflow"],
    repo: "https://github.com/hjtan03/ChAIss",
    group: "selected",
  },
  {
    slug: "maritime-perception",
    title: "Maritime Perception Pipeline",
    context: "USC undergraduate research",
    timeframe: "Apr 2024 – May 2025",
    description:
      "Computer vision pipeline for detecting and tracking small airborne objects against open sky, still in use at USC. I designed the pipeline structure around existing models with direction from my advisor: YOLOX detection, Real-ESRGAN super-resolution on the crops, ResNet-50 classification, and DeepSORT tracking, chosen over ByteTrack and SORT after comparing all three. Caught a train/validation leak caused by splitting video-sampled frames at the image level, which put near-identical frames on both sides of the split.",
    stack: ["Python", "PyTorch", "YOLOX", "ResNet-50", "DeepSORT", "Real-ESRGAN"],
    group: "selected",
  },
  {
    slug: "duckiebot",
    title: "Duckiebot Lane Following",
    context: "Robotics coursework",
    timeframe: "2024",
    description:
      "Autonomous lane-following vehicle built on ROS and Docker, with a perception and control pipeline running on onboard camera input alone.",
    stack: ["ROS", "Docker", "Python", "OpenCV"],
    group: "earlier",
  },
  {
    slug: "audio-activity-recognition",
    title: "Audio Activity Recognition",
    context: "Coursework",
    timeframe: "2024",
    description:
      "ML pipeline classifying environmental audio events including clapping, coughing, alarms, and knocking, reaching 86% classification accuracy using MFCC, FFT, and RMS-based feature extraction.",
    stack: ["Python", "scikit-learn", "MFCC", "FFT"],
    group: "earlier",
  },
  {
    slug: "nokia-ringtone-player",
    title: "Nokia Ringtone Player",
    context: "Embedded systems coursework",
    timeframe: "2023",
    description:
      "RTTTL tone generator with LED indicators on a Nucleo G474RE board, written in C++ and validated against LTSpice simulation.",
    stack: ["C++", "STM32", "LTSpice"],
    group: "earlier",
  },
];
