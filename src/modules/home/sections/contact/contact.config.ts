import { ContactConfig } from './contact.types';

/**
 * Padding compensatório: o divisor da seção de Projetos invade o topo desta seção
 * (32 / 48 / 64px). Base 96/112px + invasão: pt-32, md:pt-40, lg:pt-44.
 */
export const contactConfig: ContactConfig = {
  section: 'relative bg-brand-bg pb-24 pt-32 md:pb-32 md:pt-40 lg:pt-44',
  inner: 'px-4 md:pl-gutter-start md:pr-gutter-end',
  grid: 'grid gap-12 lg:grid-cols-12 lg:gap-12',
  intro: 'flex flex-col gap-8 lg:col-span-5',
  label:
    'mb-6 inline-flex rounded-full border-2 border-brand-ink/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink',
  title: 'text-display-sm font-bold text-brand-ink',
  lead: 'mt-6 max-w-md text-lg leading-relaxed text-brand-ink-soft',
  channels: 'border-t border-brand-ink/10',
  channel:
    'group flex items-center justify-between gap-4 border-b border-brand-ink/10 py-4 transition-colors duration-300 hover:bg-brand-accent/25',
  channelLabel: 'text-lg font-semibold tracking-tight text-brand-ink transition-transform duration-500 ease-expo-out group-hover:translate-x-2',
  channelHandle: 'ml-auto font-mono text-xs text-brand-muted',
  channelArrow:
    'text-brand-ink transition-transform duration-500 ease-expo-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5',

  resumeCard: 'block',
  resumeRow: 'flex items-start gap-4',
  resumeIcon: 'grid h-14 w-12 shrink-0 place-items-center rounded-lg bg-brand-ink font-mono text-[0.65rem] font-bold text-brand-accent',
  resumeTitle: 'text-lg font-semibold tracking-tight text-brand-ink',
  resumeMeta: 'mt-1 text-sm text-brand-ink-soft',
  resumeActions: 'mt-6 flex flex-wrap gap-3',

  formColumn: 'lg:col-span-7',
  formTitle: 'text-2xl font-semibold tracking-tight text-brand-ink md:text-3xl',
  formLead: 'mt-2 text-brand-ink-soft',
  form: 'mt-8 grid gap-5 sm:grid-cols-2',
  fieldHalf: 'sm:col-span-1',
  fieldFull: 'sm:col-span-2',
  formFooter: 'flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between',
  formNote: 'text-xs text-brand-muted',
  status: {
    success: 'rounded-xl bg-brand-success/10 px-4 py-3 text-sm font-medium text-brand-success sm:col-span-2',
    error: 'rounded-xl bg-brand-danger/10 px-4 py-3 text-sm font-medium text-brand-danger sm:col-span-2',
  },
  statusRegion: 'contents',
  statusLink: 'underline underline-offset-2',

  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      placeholder: 'Como posso te chamar?',
      autocomplete: 'name',
      required: true,
      multiline: false,
      span: 'half',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'voce@empresa.com',
      autocomplete: 'email',
      required: true,
      multiline: false,
      span: 'half',
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '(21) 90000-0000',
      autocomplete: 'tel',
      required: false,
      multiline: false,
      span: 'full',
    },
    {
      name: 'message',
      label: 'Mensagem',
      type: 'text',
      placeholder: 'Conte um pouco sobre a vaga, o projeto ou a ideia…',
      autocomplete: 'off',
      required: true,
      multiline: true,
      span: 'full',
    },
  ],
  messageMinLength: 10,
  texts: {
    label: 'Contato',
    title: 'Vamos construir algo juntos?',
    lead: 'Estou aberto a oportunidades, freelas e boas conversas sobre tecnologia. Escolha o canal que preferir.',
    channelsAria: 'Canais de contato',
    resumeTitle: 'Currículo',
    resumeMeta: 'PDF · formação, experiências e stack',
    resumeView: 'Visualizar',
    resumeDownload: 'Baixar PDF',
    formTitle: 'Envie uma mensagem',
    formLead: 'Respondo normalmente em até 48 horas.',
    optional: 'opcional',
    submit: 'Enviar mensagem',
    sending: 'Enviando…',
    note: 'Seus dados são usados apenas para responder a você.',
    success: 'Mensagem enviada! Obrigado pelo contato — respondo em breve.',
    error: 'Não consegui enviar agora. Tente de novo em instantes ou',
    errorLink: 'fale comigo no LinkedIn.',
    errors: {
      required: 'Campo obrigatório.',
      email: 'Informe um e-mail válido.',
      minlength: 'Escreva pelo menos 10 caracteres.',
    },
  },
};
