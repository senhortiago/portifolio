export interface JourneyEntry {
  year: number;
  title: string;
  summary: string;
  story: string;
  handle: string;
  /** Duas marcas curtas exibidas como "avatares" sobrepostos (siglas, símbolos). */
  marks: [string, string];
}

export type JourneySide = 'left' | 'right';

export interface JourneyConfig {
  section: string;
  inner: string;
  header: string;
  label: string;
  title: string;
  titleAmp: string;
  lead: string;
  srOnly: string;

  timeline: string;
  spine: string;
  spineFill: string;
  list: string;
  item: Record<JourneySide, string>;
  itemRaised: string;
  connector: Record<JourneySide, string>;
  dot: Record<JourneySide, string>;
  cardReveal: Record<JourneySide, Record<'hidden' | 'visible', string>>;

  year: string;
  yearApostrophe: string;
  cardTitle: string;
  cardSummary: string;
  cardBottom: string;
  cardBottomLeft: string;
  marks: string;
  mark: string;
  markSecond: string;
  meta: string;

  popup: Record<'open' | 'closed', string>;
  popupTop: string;
  popupYear: string;
  popupCloseBar: string;
  popupCloseBarSecond: string;
  popupTitle: string;
  popupStory: string;

  texts: {
    label: string;
    titleStart: string;
    titleAmp: string;
    titleEnd: string;
    lead: string;
    readMore: string;
    readMoreAria: string;
    close: string;
    now: string;
    yearAgo: string;
    yearsAgo: string;
  };
  entries: JourneyEntry[];
}
