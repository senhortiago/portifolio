# Documentação e Skills do Projeto

Este arquivo centraliza o conhecimento técnico acumulado durante o desenvolvimento, servindo como uma base de conhecimento (*Skills*) para replicar efeitos visuais, mecânicas de interação e regras de negócio específicas deste projeto em futuros desenvolvimentos.

## 1. O SISTEMA GLOBAL DE SCROLL (LENIS E ÂNCORAS)

O sistema de scroll e navegação por âncoras deve seguir uma arquitetura cinemática avançada baseada na biblioteca Lenis, com regras globais estritas de roteamento para evitar falhas de cálculo de layout (*Race Conditions* e *Layout Shifts*).

- **O Motor Padrão**: Uso obrigatório do `@studio-freight/lenis`. O uso de CSS nativo (`scroll-behavior: smooth`) é **PROIBIDO**.
- **Desativação Nativa**: A restauração e rolagem nativa do Angular Router DEVEM ser totalmente desativadas no `app.config.ts`: `withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' })`.
- **Prevenção de Overhead**: O laço de repetição (`requestAnimationFrame`) do Lenis DEVE rodar obrigatoriamente fora da zona do Angular (`this.ngZone.runOutsideAngular`) para não engatilhar ciclos destrutivos de *Change Detection*.
- **Regras de Negócios de Hiperlinks (Matriz de Navegação)**: Toda interceptação de rotas e âncoras DEVE ocorrer em um serviço globalizado Singleton (ex: `SmoothScrollService`), obedecendo a seguinte lógica imutável:
  1. **Navegação de Página Diferente COM Âncora**: Pular instantaneamente para o topo (`immediate: true`), forçar o recálculo da árvore (`lenis.resize()`) para evitar que a física trave em `maxScroll = 0` (bug de páginas curtas para páginas longas), buscar o elemento com um temporizador (`setInterval`) e rolar suavemente até o alvo.
  2. **Navegação na Mesma Página COM Âncora**: Forçar o recálculo do DOM (`lenis.resize()`) e rolar suavemente direto da posição atual até o alvo.
  3. **Navegação para Página Diferente SEM Âncora**: Pular instantaneamente para o topo, simulando um recarregamento natural de rota.
  4. **Navegação na Mesma Página SEM Âncora (ex: Clique na Logo)**: Deslizar suavemente da posição atual até o topo do site.
- **Proibição de `@defer` em Âncoras Estruturais**: Para Landing Pages e Single Page Applications, seções que são alvos de âncoras (ex: `#faq`, `#beneficios`) **NÃO PODEM** ser encapsuladas em blocos `@defer`. O atraso na injeção de componentes causa variação de altura (*Layout Shifts*), quebrando matematicamente a posição final do scroll no motor de física durante navegações cross-page. Elas devem renderizar com seu tamanho real no primeiro ciclo de vida.

## 2. EFEITO PARALAXE FRONTAL (MOTION PARALLAX)

Quando for solicitado um "Efeito Paralaxe", a implementação DEVE seguir estritamente o modelo de movimento matemático fora do motor principal do framework, evitando gambiarras com CSS `sticky` ou `background-attachment: fixed` que causam problemas em dispositivos móveis e limitam a profundidade.

### Regras de Implementação do Paralaxe

- **Escopo Isolado**: O listener de `scroll` DEVE ser acoplado fora do ciclo de vida reativo (no Angular: dentro de `this.ngZone.runOutsideAngular`).
- **Prevenção de Crashes em SSR**: O acesso ao objeto `window` DEVE ser blindado com a verificação de plataforma (ex: `isPlatformBrowser`). Se rodar no servidor, a função não deve tentar ler o `window.scrollY`.
- **Cálculo de Deslocamento Diferencial**: A lógica consiste em traduzir o elemento no eixo Y (`translateY`) multiplicando a posição da rolagem por um fator de fricção (ex: `scrollY * 0.4`).
- **Composição Visual**:
  - Elementos em primeiro plano (textos, vídeos, conteúdo) devem estar contidos em um contêiner (ex: `#parallaxContainer`).
  - Imagens de fundo (Backgrounds) NÃO DEVEM utilizar `bg-fixed`. Devem usar posição absoluta (`absolute inset-0`) e receber o MESMO multiplicador de translação do contêiner de conteúdo (usando ViewChild separados ou acoplados). Isso garante que a imagem e os elementos se desloquem em perfeita sincronia, gerando o clássico efeito de profundidade.
- **Limpeza de Eventos**: O evento de escuta de rolagem (`addEventListener('scroll', ...)`) DEVE ser obrigatoriamente destruído ao desmontar o componente (`removeEventListener`) para evitar *Memory Leaks*.

## 3. UI KIT: PADRÃO ARQUITETURAL DE MODULARIZAÇÃO (O PRINCÍPIO DO ZERO HARDCODE)

Para construir aplicações que escalem sem acumular débito técnico visual (CSS/Tailwind espalhado por todos os lados), a arquitetura deve ser blindada utilizando o padrão de **UI Kit Centralizado e Colocation**.
Nesse padrão, a regra de ouro é: **O componente pai dita a estrutura (layout e espaçamento), enquanto o elemento filho dita a estética (cores, transições e efeitos).**

### 3.1. Como Estruturar Componentes de UI Genéricos

A aplicação NÃO DEVE possuir tags cruas de interface (como `<button>`, `<span class="badge">` ou `<div>` com CSS de bordas soltas) espalhadas nos templates das páginas.
Deve ser criada uma pasta dedicada (ex: `src/components/elements`) onde cada elemento visual será encapsulado.

#### A Regra dos 3 Arquivos

Qualquer componente de UI genérico deve nascer com 3 responsabilidades estritamente separadas:

1. `[nome].types.ts`: Define a matriz tridimensional do componente (Tamanhos, Variantes de Cor, Estados).
2. `[nome].config.ts`: O único local onde classes CSS (ou Tailwind) devem existir. Dita como cada variante mapeada no arquivo `.types` se parece visualmente.
3. `[nome].component.ts`: O controlador. Recebe os inputs (ex: `variant`, `size`), lê do arquivo de configuração a classe correspondente e aplica na tag HTML, garantindo isolamento total do estilo.

### 3.2. Implementação de Botões (O Padrão Botão Mestre)

O componente de Botão deve ser o epicentro de interação e navegação da interface.

- **Dever de Abstração**: O botão deve conseguir lidar tanto com cliques locais, quanto com roteamento interno (SPA) e links externos, injetando as tags apropriadas (`<button>`, `<a>`, `<a routerLink>`) baseando-se apenas nos atributos repassados ao componente.
- **Variantes e Cores Vazadas (Ghost/Outline)**:
  - Jamais utilize fundos puramente "transparentes" ao construir botões *Ghost* que descansam sobre *Glassmorphism*. O fundo do botão vazado deve emular o exato mesmo fundo ou matriz de cor onde está inserido, para que as misturas de tela funcionem perfeitamente.
  - Para o estado de `hover` em botões não-preenchidos, crie uma regra que injete a cor da borda com baixa opacidade. Exemplo: um botão com borda azul, ao ser sobreposto, ganha um fundo azul/40, simulando o acendimento (aumento de intensidade e brilho).

### 3.3. Padrão de Pílulas e Rótulos (Badges/Chips)

Badges devem ser utilizadas para categorizar informações (tags) e DEVEM se comportar como "Cascas Estruturais" (Dumb Components).

- **Projeção Flexível e Pura**: O componente `Badge` deve fornecer apenas o contêiner geométrico (padding, background, border-radius, alinhamento flexível e gap). A aplicação pai é quem dita o conteúdo visual que o preenche através de projeção livre de conteúdo (`<ng-content>`). O `Badge` **NÃO PODE** forçar layouts fechados; ele apenas emoldura o que lhe é passado.
- **Injeção de SVGs e Conteúdo Assíncrono**: É responsabilidade do componente Pai inserir as tags de texto e SVGs de ícones de forma limpa. O Badge evita ter lógicas condicionais (`hasIcon`) espalhadas, deixando o Pai orquestrar se quer ícone, texto, ou ambos.
- **Tipagem Bidimensional**: A matriz de uma Badge exige dois eixos limpos: `Variant` (Sólido, Tinted, Glass, Ghost) e `Color` (Primary, Secondary, Success).
- O desenvolvedor usa a casca `<app-badge variant="tinted" color="primary"> <svg ...> TEXTO </app-badge>`, garantindo legibilidade imediata no HTML.

### 3.4. Padrão de Cards Estruturais (O Princípio da "Casca Oca")

Cards são os maiores agrupadores genéricos de informação e a principal causa de acoplamento perigoso em projetos não-escaláveis. Para que funcionem em qualquer cenário, os Cards DEVEM ser **100% "burros" (Dumb Components)**.

- **O Card Dita Apenas a Caixa Estrutural (Fundo e Limite)**: O `CardComponent` tem o papel estrito de renderizar o contêiner macro (background, border, padding interno, shadow, hover-states e border-radius). Ele **NÃO PODE**, sob NENHUMA hipótese, ditar cores de tipografia, controlar margens entre textos, tamanhos de fonte, ou desenhar "bolinhas" para ícones.
- **O Componente Pai Dita a Estética e a Composição**: A seção que está utilizando o card (Ex: `how-it-works.component.ts`) é a ÚNICA responsável por criar a tag `<h3>` do título, a `<p>` da descrição, e a `<div>` colorida que encapsula o ícone SVG. O Pai pega esses elementos, aplica as suas próprias classes de `.config.ts` (ex: `config.cardTitle`, `config.iconWrapper`), e as projeta para dentro da casca vazia do `<app-card>`.
- **Inversão de Controle (Zero Hardcode Interno)**: Evite slots engessados (`<ng-content select="[title]">`). O Card expõe a `div` primária limpa. Se um "Passo a Passo" exige ícones com uma bola azul e uma seção "Vantagens" usa ícones soltos com quadrados, o Card não precisa ser alterado, pois a geometria da bola ou do quadrado pertence unicamente ao Pai que consome o Card.
- **Matriz Base Limpa**: Se no futuro surgir a necessidade de um cartão escuro, adicione a variante `solid-dark` no `card.config.ts` alterando estritamente a cor do fundo do container. A responsabilidade de garantir que o texto ficará branco ao entrar no card escuro não é do Card, mas sim da Seção que invocou aquele Card e passou os textos.

### 3.5. Divisores de Seção Estruturais (SVG Dividers e Quebras Geométricas)

Para criar transições fluidas e orgânicas entre seções (curvas, recortes diagonais) sem causar *Layout Shifts* ou falhas visuais de preenchimento, o uso de Divisores em SVG é obrigatório. A implementação exige precisão matemática e compensação espacial rigorosa.

- **Centralização do Divisor**: SVGs de transição DEVEM ser gerenciados por um componente agnóstico (`<app-section-divider>`) centralizado (via `.config.ts` e `.types.ts`), impedindo código SVG estático espalhado pelos arquivos `.component.ts`.
- **Responsividade Híbrida**: O elemento `<svg>` DEVE conter `preserveAspectRatio="none"` aliado ao uso de uma `viewBox` fixa (ex: `viewBox="0 0 1440 100"`). A largura será sempre ditada por utilitários fluidos (`w-full`), mas a altura DEVE ser travada via classes em *breakpoints* (ex: `h-8 md:h-12 lg:h-16`) para controlar de forma fina o grau de agressividade e inclinação do corte na tela.
- **Matemática do Corte Limpo (Prevenção de Margem Fantasma)**: Em curvas de Bezier Quadráticas (`Q`), o traçado nunca toca o ponto de controle central, ele passa por uma interpolação na metade da distância geométrica. Para que a curva nasça IMEDIATAMENTE da extremidade do `viewBox` (sem criar uma barra de margem com cor sólida antes de começar a se curvar), a âncora do eixo Y do ponto de controle DEVE ser posta no *dobro* do limite útil da área. Por exemplo, em um `viewBox` de altura `100`, uma curva que ocupe os 100% de área geométrica deve usar a âncora `Q720,200` ou `Q720,-100`.
- **Prevenção de Clipping Constrito (O Problema do Overflow)**: Quando um SVG é ancorado de forma "transbordante" (usando classes como `top-0 -translate-y-[99%]`) para intencionalmente invadir a seção anterior/superior, é **ESTRITAMENTE PROIBIDO** que o container da seção possua a diretiva de CSS `overflow-hidden`. O overflow escondido força o *clipping* das bordas, fazendo com que a barriga da curva desapareça restando apenas uma linha reta decepada.
- **Equação de Padding Compensatório (Offsetting)**: Curvas SVG que sobrepõem e invadem seções adjacentes ocupam fisicamente o espaço nativo daquela seção. Isso causa distorção de distância (o texto parece encostado na curva). Para equalizar a folga visual e restaurar a centralização do conteúdo:
  1. Calcule a altura CSS que o SVG invasor ocupa no *breakpoint* atual (ex: se tem `h-16`, ele come 64px de área da vizinhança).
  2. Subtraia essa margem do padding interno afetado (se invadiu o topo, adicione na conta do `pt`, se invadiu a base, adicione na conta do `pb`) da seção *vítima*.
  3. Exemplo: Se uma seção requer `112px` de respiro original (`py-28`), mas seu fundo sofre o roubo espacial por uma base convexa que se expande por `64px`, o layout exige matematicamente que a classe CSS possua o respectivo offset em sua base: `pb-44` (`112px + 64px`).
