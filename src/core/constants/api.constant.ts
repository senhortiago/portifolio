export const apiConstant = {
  projectsUrl: 'data/projects.json',
  /** Endpoint REST do EmailJS (credenciais em emailjs.constant.ts). */
  contactUrl: 'https://api.emailjs.com/api/v1.0/email/send',
  requestTimeoutMs: 12000,
} as const;
