export interface SocialLink {
  id: 'linkedin' | 'github' | 'instagram' | 'youtube' | 'email';
  label: string;
  handle: string;
  url: string;
}

export const linksConstant = {
  social: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'in/tiago-barcelos',
      url: 'https://www.linkedin.com/in/tiago-barcelos/',
    },
    {
      id: 'github',
      label: 'GitHub',
      handle: '@senhortiago',
      url: 'https://github.com/senhortiago',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@tiago_lbarcelos',
      url: 'https://www.instagram.com/tiago_lbarcelos/',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      handle: '@tiagophydev',
      url: 'https://www.youtube.com/@tiagophydev',
    },
  ] satisfies SocialLink[],
  resume: {
    url: 'cv/tiago-barcelos-cv.pdf',
    fileName: 'Tiago-Barcelos-CV.pdf',
  },
  media: {
    heroVideo: 'media/hero-video.mp4',
  },
} as const;
