export type GridProject = {
  slug: string;
  title: string;
  context: string;
  timeframe: string;
  description: string;
  stack: string[];
  repo?: string;
};

/**
 * Compact grid entries. Featured projects live in content/projects/*.mdx.
 * Every claim here is defensible in an interview. Do not add metrics or
 * scope that isn't already stated.
 */
export const gridProjects: GridProject[] = [
  {
    slug: "chaiss",
    title: "ChAIss",
    context: "USC senior capstone, 5-person team",
    timeframe: "2024 – 2025",
    description:
      "Android chess app that reads a physical board through the camera and plays or analyzes the position. I planned the project and chose the stack: Java calling Python through Chaquopy, python-chess for move generation, and a Roboflow-trained TFLite model for detection. Because detection isn't reliable enough to trust blindly, the board has a lock/unlock mode so a misread position can be corrected by hand and relocked. I built the UI, settings, and board theming.",
    stack: ["Java", "Android", "Chaquopy", "python-chess", "TFLite", "Roboflow"],
    repo: "https://github.com/hjtan03/ChAIss",
  },
  {
    slug: "maritime-perception",
    title: "Maritime Perception Pipeline",
    context: "USC undergraduate research",
    timeframe: "Apr 2024 – May 2025",
    description:
      "Computer vision pipeline for detecting and tracking small airborne objects against open sky, still in use at USC. I designed the pipeline structure around existing models with direction from my advisor: YOLOX detection, Real-ESRGAN super-resolution on the crops, ResNet-50 classification, and DeepSORT tracking, chosen over ByteTrack and SORT after comparing all three. Caught a train/validation leak caused by splitting video-sampled frames at the image level, which put near-identical frames on both sides of the split.",
    stack: ["Python", "PyTorch", "YOLOX", "ResNet-50", "DeepSORT", "Real-ESRGAN"],
  },
  {
    slug: "duckiebot",
    title: "Duckiebot Lane Following",
    context: "Robotics coursework",
    timeframe: "2024",
    description:
      "Autonomous lane-following vehicle built on ROS and Docker, with a perception and control pipeline running on onboard camera input alone.",
    stack: ["ROS", "Docker", "Python", "OpenCV"],
  },
  {
    slug: "audio-activity-recognition",
    title: "Audio Activity Recognition",
    context: "Coursework",
    timeframe: "2024",
    description:
      "ML pipeline classifying environmental audio events including clapping, coughing, alarms, and knocking, reaching 86% classification accuracy using MFCC, FFT, and RMS-based feature extraction.",
    stack: ["Python", "scikit-learn", "MFCC", "FFT"],
  },
  {
    slug: "nokia-ringtone-player",
    title: "Nokia Ringtone Player",
    context: "Embedded systems coursework",
    timeframe: "2023",
    description:
      "RTTTL tone generator with LED indicators on a Nucleo G474RE board, written in C++ and validated against LTSpice simulation.",
    stack: ["C++", "STM32", "LTSpice"],
  },
];
