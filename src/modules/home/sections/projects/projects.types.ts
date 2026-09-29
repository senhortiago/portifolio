export interface ProjectsConfig {
  section: string;
  inner: string;
  header: string;
  label: string;
  title: string;
  lead: string;
  srOnly: string;

  list: string;
  row: string;
  rowOpen: string;
  trigger: string;
  index: string;
  titleWrap: string;
  rowTitle: string;
  rowSummary: string;
  tags: string;
  year: string;
  toggleIcon: Record<'open' | 'closed', string>;
  toggleBar: string;
  toggleBarVertical: Record<'open' | 'closed', string>;

  panel: Record<'open' | 'closed', string>;
  panelClip: string;
  panelGrid: string;
  cover: string;
  coverChrome: string;
  coverChromeDot: string;
  coverTitle: string;
  coverIndex: string;
  details: string;
  description: string;
  facts: string;
  factItem: string;
  factLabel: string;
  factValue: string;
  actions: string;

  skeletonRow: string;
  skeletonIndex: string;
  skeletonTitle: string;
  skeletonMeta: string;

  errorCard: string;
  errorTitle: string;
  errorText: string;
  errorActions: string;

  skeletonCount: number;
  texts: {
    label: string;
    title: string;
    lead: string;
    loading: string;
    toggleAria: string;
    role: string;
    year: string;
    stack: string;
    repository: string;
    demo: string;
    errorTitle: string;
    errorText: string;
    retry: string;
    openGithub: string;
    empty: string;
  };
}
