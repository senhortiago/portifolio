export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutConfig {
  section: string;
  inner: string;
  label: string;
  statement: string;
  statementMuted: string;
  rotatingRow: string;
  rotatingPrefix: string;
  srOnly: string;
  rotatingBadge: string;
  rotatingCaret: string;
  grid: string;
  bioColumn: string;
  bio: string;
  traitList: string;
  traitIcon: string;
  statsGrid: string;
  statCard: string;
  statValue: string;
  statLabel: string;
  marquee: string;
  marqueeTrack: string;
  marqueeList: string;
  marqueeItem: string;
  marqueeDot: string;
  reveal: Record<'hidden' | 'visible', string>;

  texts: {
    label: string;
    statement: string;
    statementMuted: string;
    rotatingPrefix: string;
    bio: string[];
    stackLabel: string;
  };
  rotatingTerms: string[];
  traits: string[];
  stats: AboutStat[];
  stack: string[];
  typing: {
    deleteMs: number;
    typeMs: number;
    holdMs: number;
    pauseMs: number;
  };
}
