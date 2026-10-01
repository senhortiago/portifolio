import { DOCUMENT } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { brandConstant } from '../../constants/brand.constant';
import { linksConstant } from '../../constants/links.constant';
import { seoConstant } from '../../constants/seo.constant';
import { JsonLdNode, SeoPage } from './seo.types';

/**
 * Injeta <title>, meta tags (SEO, Open Graph, Twitter), link canonical e dados estruturados (JSON-LD).
 * Roda na pré-renderização do build, então tudo já sai no HTML estático lido pelos crawlers.
 * No browser, as tags existentes são atualizadas (nunca duplicadas).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  apply(page: SeoPage): void {
    const url = this.absoluteUrl(page.path);
    const image = this.absoluteUrl(seoConstant.ogImage.path);

    this.title.setTitle(page.title);
    this.setMetaTags(page, url, image);
    this.setCanonical(url);
    this.setJsonLd(this.buildSchema(page, url, image));
  }

  private setMetaTags(page: SeoPage, url: string, image: string): void {
    const { ogImage } = seoConstant;
    const tags: MetaDefinition[] = [
      { name: 'description', content: page.description },
      { name: 'keywords', content: seoConstant.keywords.join(', ') },
      { name: 'author', content: brandConstant.fullName },
      { name: 'robots', content: seoConstant.robots },

      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: seoConstant.siteName },
      { property: 'og:locale', content: seoConstant.locale },
      { property: 'og:url', content: url },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: ogImage.type },
      { property: 'og:image:width', content: String(ogImage.width) },
      { property: 'og:image:height', content: String(ogImage.height) },
      { property: 'og:image:alt', content: ogImage.alt },
      { property: 'profile:first_name', content: seoConstant.person.givenName },
      { property: 'profile:last_name', content: seoConstant.person.familyName },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: ogImage.alt },
    ];

    if (seoConstant.googleSiteVerification) {
      tags.push({ name: 'google-site-verification', content: seoConstant.googleSiteVerification });
    }

    tags.forEach((tag) => this.meta.updateTag(tag));
  }

  private setCanonical(url: string): void {
    const link = this.headElement('link[rel="canonical"]', 'link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url);
  }

  private setJsonLd(schema: JsonLdNode): void {
    const script = this.headElement('script[type="application/ld+json"]', 'script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    // `<` escapado: impede que um texto com "</script>" feche a tag antes da hora.
    this.renderer.setProperty(script, 'textContent', JSON.stringify(schema).replace(/</g, '\\u003c'));
  }

  /** Reaproveita o elemento já presente no <head> (ex: vindo da pré-renderização) ou cria um novo. */
  private headElement(selector: string, tagName: 'link' | 'script'): HTMLElement {
    const existing = this.document.head.querySelector<HTMLElement>(selector);
    if (existing) {
      return existing;
    }
    const element: HTMLElement = this.renderer.createElement(tagName);
    this.renderer.appendChild(this.document.head, element);
    return element;
  }

  private buildSchema(page: SeoPage, url: string, image: string): JsonLdNode {
    const home = this.absoluteUrl('/');
    const ids = { website: `${home}#website`, person: `${home}#person`, page: `${url}#webpage` };
    const { person, ogImage } = seoConstant;
    const toOrganization = (org: { name: string; alternateName: string; url: string }): JsonLdNode => ({
      '@type': 'CollegeOrUniversity',
      name: org.name,
      alternateName: org.alternateName,
      url: org.url,
    });

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': ids.website,
          url: home,
          name: seoConstant.siteName,
          inLanguage: seoConstant.language,
          publisher: { '@id': ids.person },
        },
        {
          '@type': 'ProfilePage',
          '@id': ids.page,
          url,
          name: page.title,
          description: page.description,
          inLanguage: seoConstant.language,
          isPartOf: { '@id': ids.website },
          about: { '@id': ids.person },
          mainEntity: { '@id': ids.person },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image,
            width: ogImage.width,
            height: ogImage.height,
          },
        },
        {
          '@type': 'Person',
          '@id': ids.person,
          name: brandConstant.fullName,
          givenName: person.givenName,
          familyName: person.familyName,
          jobTitle: brandConstant.role,
          description: person.description,
          url: home,
          image,
          address: {
            '@type': 'PostalAddress',
            addressLocality: person.address.locality,
            addressRegion: person.address.region,
            addressCountry: person.address.country,
          },
          alumniOf: person.alumniOf.map(toOrganization),
          affiliation: person.affiliation.map(toOrganization),
          knowsAbout: person.knowsAbout,
          sameAs: linksConstant.social.map((link) => link.url),
        },
      ],
    };
  }

  private absoluteUrl(path: string): string {
    return `${seoConstant.siteUrl}/${path.replace(/^\/+/, '')}`;
  }
}
