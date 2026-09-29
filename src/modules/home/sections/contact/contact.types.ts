export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';
export type ContactFieldName = 'name' | 'email' | 'phone' | 'message';

export interface ContactFieldDefinition {
  name: ContactFieldName;
  label: string;
  type: 'text' | 'email' | 'tel';
  placeholder: string;
  autocomplete: string;
  required: boolean;
  multiline: boolean;
  span: 'half' | 'full';
}

export interface ContactConfig {
  section: string;
  inner: string;
  grid: string;
  intro: string;
  label: string;
  title: string;
  lead: string;
  channels: string;
  channel: string;
  channelLabel: string;
  channelHandle: string;
  channelArrow: string;

  resumeCard: string;
  resumeRow: string;
  resumeIcon: string;
  resumeTitle: string;
  resumeMeta: string;
  resumeActions: string;

  formColumn: string;
  formTitle: string;
  formLead: string;
  form: string;
  fieldHalf: string;
  fieldFull: string;
  formFooter: string;
  formNote: string;
  status: Record<Exclude<ContactStatus, 'idle' | 'sending'>, string>;
  statusRegion: string;
  statusLink: string;

  fields: ContactFieldDefinition[];
  messageMinLength: number;
  texts: {
    label: string;
    title: string;
    lead: string;
    channelsAria: string;
    resumeTitle: string;
    resumeMeta: string;
    resumeView: string;
    resumeDownload: string;
    formTitle: string;
    formLead: string;
    optional: string;
    submit: string;
    sending: string;
    note: string;
    success: string;
    error: string;
    errorLink: string;
    errors: {
      required: string;
      email: string;
      minlength: string;
    };
  };
}
