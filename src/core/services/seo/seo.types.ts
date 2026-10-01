/** Metadados de uma página indexável. */
export interface SeoPage {
  /** Conteúdo do <title> (ideal: até ~60 caracteres). */
  title: string;
  /** Meta description (ideal: até ~160 caracteres). */
  description: string;
  /** Caminho relativo à raiz do site (ex: '/'), usado no canonical e no og:url. */
  path: string;
}

/** Nó de dados estruturados (https://schema.org) serializado no JSON-LD. */
export type JsonLdNode = { [key: string]: JsonLdValue };
export type JsonLdValue = string | number | boolean | JsonLdNode | readonly JsonLdValue[];
