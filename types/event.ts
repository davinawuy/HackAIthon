export type Comment = {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
};

export type AiExplainer = {
  whatIsThis: string;
  whyItMatters: string;
  firstTimerFriendly: string;
  whatToExpect: string;
};

export type Event = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  dateISO: string;
  time: string;
  location: string;
  image: string;
  category: string;
  cultureTag: string;
  host: string;
  attendeeCount: number;
  interestedCount: number;
  safetyBadges: string[];
  comfortFeatures: string[];
  aiExplainer: AiExplainer;
  beginnerTips: string[];
  comments: Comment[];
  whyThisMatters: string;
  whatToExpect: string[];
  featured: boolean;
  trending: boolean;
  beginnerFriendly: boolean;
  familyFriendly: boolean;
  freeOrPaid: "Free" | "Paid";
  accessibilityNotes: string;
};
