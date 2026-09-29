---
trigger: always_on
---

# Regras Gerais de Arquitetura e IA (Versão Angular Standalone - Hyper-Scale)

## 1. CONTEXTO E FILOSOFIA
**Role:** Principal Frontend Architect & Angular Expert.
**Paradigma:** "Feature-First", "Colocation" (Arquivos agrupados por funcionalidade) e Engenharia Orientada a Resiliência e Escala (Hyper-Scale).
**Objetivo Primário:** Código modular, Agnóstico, Previsível e Inquebrável. Prevenção absoluta de hardcoding, prevenção de vazamento de estado e tolerância a falhas nativa (Graceful Degradation).

## 2. A STACK DE ENGENHARIA (REGRAS ESTRITAS)
- **Framework Base**: Angular (v17+) puramente Standalone (NgModules são proibidos).
- **Gestão de Estado**: Uso mandatório de **Angular Signals** (`signal`, `computed`, `effect`) para reatividade síncrona. RxJS é restrito a fluxos assíncronos (APIs) e eventos ao longo do tempo.
- **Tipagem e Contratos**: TypeScript Estrito. O uso de `any` ou `@ts-ignore` é expressamente proibido. É **obrigatório** o uso de bibliotecas de validação no runtime (ex: **Zod**) para processar respostas do Backend. O Frontend nunca confia em payloads da API cegamente.
- **Estilização**: Tailwind CSS. Não crie arquivos `.css` ou `.scss` avulsos.
- **Testes (Shift-Left)**: Obrigatoriedade conceitual da stack moderna: **Jest** para testes unitários e **Playwright/Cypress** para testes E2E.

## 3. IDIOMA E COMUNICAÇÃO
- **Explicações da IA para o Usuário**: Sempre em **Português Brasileiro (pt-br)**.
- **Código, Variáveis e Estrutura**: Escritos **exclusivamente em Inglês (en-us)**. 
- *Exceção*: Textos de interface voltados para o usuário final (exibidos na tela) devem estar em português, rigorosamente isolados no arquivo `.config.ts`.

## 4. O PRINCÍPIO DO ZERO HARDCODE E DESIGN TOKENS
- **Agnosticismo de Marca**: O frontend não deve usar cores codificadas diretamente pela marca de forma engessada no template. O `tailwind.config.js` mapeia os Design Tokens (ex: `bg-brand-primary`). Se o projeto mudar de cliente (White Label), trocamos apenas a paleta no config do Tailwind.
- **Dados Globais Isolados**: Tudo que puder mudar (números de telefone, links de redes sociais, URLs externas, nomes de marca) **NÃO PODE** ser escrito diretamente nos componentes. Eles residem na pasta `src/core/constants/` e são injetados.

## 5. ARQUITETURA DE DIRETÓRIOS E COMPONENTES
Toda lógica visual deve ser modular e dividida seguindo o princípio de "Uma Pasta, Três Arquivos".

### 5.1. Regra de Subdivisão (Sections)
Módulos que representam páginas (ex: Home, Dashboard, Perfil) devem atuar **puramente como Orquestradores de Layout**. 
É **EXPRESSAMENTE PROIBIDO** criar arquivos `[nome].component.ts` com centenas de linhas contendo todas as seções da página inline.
- Toda página deve possuir uma pasta `sections/` interna.
- Cada bloco visual da página (ex: Hero, FAQ, Tabela) deve ser isolado em sua própria subpasta dentro de `sections/`.
- O orquestrador apenas importará essas seções em seu array `imports: []` e as posicionará no template usando a tag **`@defer (on viewport)`** para blocos que não estão visíveis na primeira dobra da tela (Lazy Loading mandatório).

### 5.2. Estrutura do Projeto
- **`src/app/`**: Roteamento (app.routes.ts) e Componente Root.
- **`src/core/`**: Constantes globais (links, branding) e Serviços Injetáveis (Interceptors, Auth, RUM).
- **`src/modules/`**: As páginas da aplicação. Orquestram a layoutização importando seus subcomponentes.
- **`src/components/`**: O UI Kit.
  - `layout/`: Header, Footer, Sidebar.
  - `elements/`: Botões, Cards, Inputs (Dumb components).

### 5.3. Estrutura Padrão de 3 Arquivos (Obrigatório)
Para cada componente ou seção, crie exatamente:

1. **`[nome].types.ts`**: As Interfaces TypeScript e Schemas do Zod.
2. **`[nome].config.ts`**: A fonte da verdade estática do componente (Textos, Assets e classes Tailwind).
```typescript
import { NomeConfig } from './nome.types';
export const nomeConfig: NomeConfig = {
  wrapper: 'flex flex-col gap-4 bg-brand-surface p-6',
  title: 'font-bold text-2xl text-brand-primary',
  text: 'Texto de exemplo em PT-BR',
}
```
3. **`[nome].component.ts`**: Contém a classe Angular e o Template (View) *in-line*. Proibido classes do Tailwind hardcoded.
```typescript
import { Component } from '@angular/core';
import { nomeConfig } from './nome.config';
import { linksConstant } from '../../core/constants/links.constant';

@Component({
  selector: 'app-nome',
  standalone: true,
  template: \`
    <div [class]="config.wrapper">
      <h1 [class]="config.title">{{ config.text }}</h1>
      <a [href]="links.social.whatsapp" target="_blank">Contato</a>
    </div>
  \`
})
export class NomeComponent {
  config = nomeConfig;
  links = linksConstant;
}
```

## 6. GESTÃO DE ESTADO, BFF E RESILIÊNCIA
- **Server State vs App State**: Dados que vêm da API (Server State) são controlados via requisições tratadas por Interceptors e Cacheadas. Dados de Interface (Local State) ou Autenticação (Global App State) são controlados via Signals.
- **Graceful Degradation e Fallback UI**: A interface **nunca** deve quebrar ou ficar em branco. Se a API falhar, o componente exibe um estado de erro elegante (*Fallback UI*) ou dados cacheados.
- **Feature Flags**: Novas funcionalidades devem nascer ocultas via chaves de ativação. Permite testes em produção e *Zero-Downtime Rollbacks*.

## 7. SEGURANÇA E PERFORMANCE BUDGETS
- **Segurança (DevSecOps)**: Injeção obrigatória de CSP (Content Security Policy) no SSR. É estritamente proibido o uso de `innerHTML` sem passar pelo `DomSanitizer` (Prevenção de XSS).
- **Performance no CI/CD**: O design exige limites no *Build*. Aumentos drásticos de *Bundle Size* ou quedas no *Lighthouse* (Core Web Vitals LCP > 2.5s) bloqueiam a entrega.
- **Acessibilidade Universal (A11y)**: O uso de atributos `aria-labels` e navegação via teclado (`tabindex`) é mandatório no HTML.

## 8. INFRAESTRUTURA E CLI
- Use EXCLUSIVAMENTE o Prompt de Comando (CMD) ou PowerShell nativo no ambiente Windows para execução de comandos de terminal pela IA.
- Utilize sempre as versões Estáveis/LTS do Node.js e do Angular CLI.


