import { brandConstant } from '../../core/constants/brand.constant';
import { HomeConfig } from './home.types';

export const homeConfig: HomeConfig = {
  wrapper: 'relative',
  seo: {
    title: `${brandConstant.fullName} · ${brandConstant.role} | Java e Angular`,
    description:
      'Portfólio de Tiago Barcelos, desenvolvedor de software no Rio de Janeiro: back-end com Java, Spring Boot e Python, front-end com Angular. Projetos e contato.',
    path: '/',
  },
};
