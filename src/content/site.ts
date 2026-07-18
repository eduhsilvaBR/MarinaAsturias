// Conteúdo real extraído de marinasturias.com.br (WordPress) em 2026-07-17.
// URLs de imagem foram verificadas individualmente (HTTP 200) antes de entrar aqui.

const UP2103 = "https://marinasturias.com.br/wp-content/uploads/2021/03";
const UP2104 = "https://marinasturias.com.br/wp-content/uploads/2021/04";

export const siteInfo = {
  name: "Marina Astúrias",
  tagline: "A melhor marina do Brasil",
  boilerplate:
    "A Porto Marina Astúrias conta com 72 mil m² de área total e possui capacidade para receber mais de 500 embarcações, aportadas em píeres ou nos hangares.",
  address: "Rua Francesca Sapochetti Castrucci, 805, Guarujá – São Paulo – Brasil, CEP: 11420-550",
  phones: ["(13) 3354-3888", "(13) 3354-3708", "(13) 3354-3916"],
  whatsapp: "(13) 98178-0250",
  whatsappHref: "https://wa.me/5513981780250",
  coords: "Lat. 23°0′59″ S · Long. 46°0′17′39″ W",
  hours: "Todos os dias, das 8h às 17h — inclusive sábados, domingos e feriados",
  social: {
    facebook: "https://www.facebook.com/portomarinaasturias/",
    instagram: "https://www.instagram.com/portomarinaasturias/",
  },
  stats: [
    { value: 3, suffix: "", label: "Travel Lifts" },
    { value: 12, suffix: "", label: "Hangares Fechados" },
    { value: 72000, suffix: " m²", label: "Área total" },
    { value: 500, suffix: "+", label: "Embarcações" },
  ],
} as const;

export const navGroups = [
  { label: "Conheça a Marina", href: "/conheca-a-marina" },
  {
    label: "Estrutura",
    href: "/estrutura",
    children: [
      { label: "Hangares Fechados", href: "/hangares-fechados" },
      { label: "Equipamentos", href: "/equipamentos" },
      { label: "Posto de Abastecimento", href: "/posto-de-abastecimento" },
      { label: "Segurança Total", href: "/seguranca-total" },
      { label: "Gastronomia", href: "/gastronomia" },
      { label: "Central de Atendimento", href: "/central-atendimento" },
      { label: "Esporte e Lazer", href: "/esporte-e-lazer" },
      { label: "Internet", href: "/internet" },
      { label: "Heliponto", href: "/heliponto" },
      { label: "Sala Rádio", href: "/sala-de-radio" },
    ],
  },
  { label: "Eventos", href: "/eventos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Tempo e Navegação", href: "/tempo-e-navegacao" },
  { label: "Fale Conosco", href: "/fale-conosco" },
] as const;

export const heroSlides = [
  { eyebrow: "Localização privilegiada", title: "Acesso por mar, terra e ar.", image: `${UP2103}/03.jpg`, position: "center 70%" },
  { eyebrow: "Yachts & Boats", title: "Pode curtir. A gente cuida do resto.", image: `${UP2103}/02.jpg`, position: "center 45%" },
  { eyebrow: "A melhor marina do Brasil", title: "Privacidade, requinte, conforto e lazer.", image: `${UP2103}/05.jpg`, position: "center 55%" },
  { eyebrow: "Um local único", title: "Requinte, beleza e sofisticação.", image: `${UP2103}/04.jpg`, position: "center 40%" },
  { eyebrow: "Venha conhecer", title: "Não faltam motivos para você descobrir nossas belezas.", image: `${UP2103}/06.jpg`, position: "center 50%" },
  { eyebrow: "Marina Astúrias", title: "Aqui o mundo para.", image: `${UP2103}/01.jpg`, position: "20% 65%" },
];

export const testimonials = [
  { name: "Elizabeth", tag: "Maravilhosa", quote: "A Marina Astúrias é a minha segunda casa." },
  { name: "Ricardo", tag: "Descanso a valer", quote: "Não vejo a hora de chegar o fim de semana." },
  { name: "Paulo", tag: "Fácil acesso", quote: "Com certeza possui uma ótima localização." },
];

export const homeGallery = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `${UP2104}/imagem${n}.jpg`;
});

export type InteriorPage = {
  slug: string;
  nav: string;
  title: string;
  subtitle?: string;
  hero: string;
  paragraphs: string[];
  list?: string[];
  stats?: { value: string; label: string }[];
  gallery?: string[];
};

export const interiorPages: Record<string, InteriorPage> = {
  "conheca-a-marina": {
    slug: "conheca-a-marina",
    nav: "Conheça a Marina",
    title: "Conheça a Marina Astúrias",
    subtitle: "A Marina",
    hero: `${UP2103}/indique-1.jpg`,
    paragraphs: [
      "A Porto Marina Astúrias está localizada na cidade do Guarujá, litoral sul do estado de São Paulo, dentro do Complexo Industrial Naval de Guarujá (Cing). Conta com 72 mil m² de área total e possui capacidade para receber mais de 500 embarcações, aportadas em píeres ou nos hangares.",
      "Em frente ao Canal de Santos, a Marina foi estrategicamente projetada para oferecer o que há de melhor no que diz respeito aos cuidados exigidos pela comunidade náutica, seguindo rigorosamente as Normas da Autoridade Marinha (Normam).",
      "A Porto Marina Astúrias é um espaço de confraternização para sua família e amigos e também um local onde você poderá encontrar boas oportunidades para incrementar e fortalecer seus negócios.",
    ],
    list: [
      "Heliponto",
      "Sala-rádio",
      "Hangares fechados",
      "Posto de abastecimento próprio (Petrobras)",
      "Loja de conveniência",
      "Áreas de esporte e lazer",
      "Quadras de tênis",
      "Piscina",
      "Academia de ginástica",
      "Lanchonete",
      "Restaurante",
    ],
    gallery: [`${UP2103}/marina1.jpg`, `${UP2103}/marina2.jpg`, `${UP2103}/marina3.jpg`, `${UP2103}/marina4.jpg`],
  },
  "hangares-fechados": {
    slug: "hangares-fechados",
    nav: "Hangares Fechados",
    title: "Hangares Fechados",
    hero: `${UP2103}/hangares-2.jpg`,
    paragraphs: [
      "A Marina possui um total de 12 hangares, cada um com 1.800 m², todos completamente fechados para garantir maior proteção às embarcações garageadas e tranquilidade aos seus proprietários.",
    ],
    stats: [
      { value: "12", label: "Hangares" },
      { value: "1.800 m²", label: "Cada hangar" },
      { value: "72.000 m²", label: "Área total" },
      { value: "500+", label: "Embarcações" },
    ],
    gallery: [
      `${UP2103}/marina64-660x528.jpg`,
      `${UP2103}/marina62-660x528.jpg`,
      `${UP2103}/marina61-660x528.jpg`,
      `${UP2103}/marina60-660x528.jpg`,
      `${UP2103}/marina59-660x528.jpg`,
      `${UP2104}/marina18b-1-660x528.jpg`,
      `${UP2104}/IMG_0070-1024x683-1-660x660.jpg`,
      `${UP2104}/IMG_0047-1024x683-1-660x660.jpg`,
      `${UP2104}/IMG_0044-1024x683-1-660x660.jpg`,
    ],
  },
  equipamentos: {
    slug: "equipamentos",
    nav: "Equipamentos",
    title: "Equipamentos",
    hero: `${UP2103}/equipamentos.jpg`,
    paragraphs: [
      "Essenciais para a remoção das embarcações, a Marina Astúrias possui, para maior agilidade nas suas operações, uma rampa para embarcações pequenas, três carreiras de Travelift para subidas e descidas de embarcações, e três travelifts sendo dois com capacidade até 50 toneladas e um com capacidade até 100 toneladas, excelentes para o transporte de embarcações no seco. Também possui três traveljack, três tratores e guinchos, todos operados com segurança e por equipes devidamente treinadas.",
    ],
    list: [
      "Rampa para embarcações pequenas",
      "3 carreiras de Travelift",
      "3 travelifts (2× 50 toneladas, 1× 100 toneladas)",
      "3 traveljack",
      "3 tratores",
      "Guinchos",
    ],
    gallery: [
      `${UP2104}/im-marina-equipamento-travelift-2-1-Copia.jpg`,
      `${UP2103}/g-im-marina-equipamento-travelift.jpg`,
      `${UP2103}/g-im-marina-equipamento-kinglift-traveljack.jpg`,
      `${UP2103}/g-im-marina-equipamento-travelift-3.jpg`,
    ],
  },
  "posto-de-abastecimento": {
    slug: "posto-de-abastecimento",
    nav: "Posto de Abastecimento",
    title: "Posto de Abastecimento",
    hero: `${UP2103}/posto.jpg`,
    paragraphs: [
      "O cliente da Porto Marina Astúrias pode abastecer sua embarcação com todo conforto e segurança. A Marina possui posto de abastecimento próprio, com a bandeira Petrobras.",
    ],
    list: [
      "Gasolina Podium — possibilita total aproveitamento da potência do motor, mantendo limpos o sistema de combustão, os bicos injetores e as válvulas do motor",
      "Diesel Verana — feito especialmente para embarcações de lazer, com o menor teor de enxofre e o menor nível de emissão de poluentes do segmento",
      "Óleos e Lubrificantes — para barcos, motoaquáticos e materiais de limpeza",
    ],
    gallery: [`${UP2104}/7.jpg`, `${UP2104}/6.jpg`, `${UP2104}/5.jpg`, `${UP2104}/4.jpg`, `${UP2104}/3.jpg`, `${UP2104}/1.jpg`],
  },
  "seguranca-total": {
    slug: "seguranca-total",
    nav: "Segurança Total",
    title: "Segurança Total",
    hero: `${UP2103}/segruanca.jpg`,
    paragraphs: [
      "Com uma movimentação de aproximadamente 450 pessoas por dia, chegando a dobrar em alguns finais de semana, a segurança é uma das questões mais importantes para a Administração, que disponibiliza:",
    ],
    list: [
      "Equipe de seguranças treinados, espalhados estrategicamente por toda extensão da Marina",
      "130 câmeras de monitoramento, que cobrem todo o perímetro da Marina",
      "Circuito fechado de TV (sistema CFTV)",
    ],
    stats: [
      { value: "~450", label: "Pessoas / dia" },
      { value: "130", label: "Câmeras" },
    ],
    gallery: [
      `${UP2104}/5-1-660x660.jpg`,
      `${UP2104}/IMG_9355-660x660.jpg`,
      `${UP2104}/IMG_9334-660x660.jpg`,
      `${UP2104}/IMG_9523-660x660.jpg`,
      `${UP2104}/IMG_9514-660x660.jpg`,
      `${UP2104}/IMG_9497-2-660x660.jpg`,
    ],
  },
  gastronomia: {
    slug: "gastronomia",
    nav: "Gastronomia",
    title: "Gastronomia",
    hero: `${UP2103}/gastronomia_topo.jpg`,
    paragraphs: [
      "O restaurante Porto Marina Astúrias tem ótimas opções gastronômicas, além de um excelente bar.",
      "Um bistrô que oferece um variado cardápio internacional para quem, além da náutica, é apaixonado por gastronomia. Um excelente ponto de encontro, tanto para reunir os amigos como para tratar de seus negócios, além de uma ótima opção para descansar e ter um maravilhoso momento em família.",
      "O ponto forte são os pratos mediterrâneos, com destaque para os diversos tipos de bacalhau, as receitas de paella e a variedade de camarões.",
    ],
    gallery: [
      `${UP2104}/IMG_9978-660x660.jpg`,
      `${UP2104}/IMG_9964-660x660.jpg`,
      `${UP2104}/IMG_9963-660x660.jpg`,
      `${UP2104}/IMG_9941-660x660.jpg`,
      `${UP2104}/IMG_9911-660x660.jpg`,
      `${UP2103}/marina29.jpg`,
      `${UP2103}/marina48.jpg`,
    ],
  },
  "central-atendimento": {
    slug: "central-atendimento",
    nav: "Central de Atendimento",
    title: "Central de Atendimento",
    hero: `${UP2103}/centralatendimento.jpg`,
    paragraphs: [
      "A Central de Atendimento é um canal direto de comunicação e prestação de serviço da Porto Marina Astúrias com seus clientes. O horário de funcionamento da Central é das 8h às 17h, todos os dias, inclusive aos sábados, domingos e feriados.",
    ],
    list: ["Informações gerais", "Legislação", "Encaminhamento e resolução de dúvidas e reclamações"],
    gallery: [`${UP2104}/8.jpg`, `${UP2103}/marina72-660x528.jpg`],
  },
  "esporte-e-lazer": {
    slug: "esporte-e-lazer",
    nav: "Esporte e Lazer",
    title: "Esporte e Lazer",
    hero: `${UP2103}/esportelazer.jpg`,
    paragraphs: [
      "Toda a área de lazer da Marina pode ser usada por seus frequentadores para momentos de descontração com a família e com os amigos. No complexo da Marina Astúrias, você pode desfrutar de:",
    ],
    list: [
      "Quadras de tênis",
      "Academia de ginástica",
      "Piscina, localizada em um platô elevado com uma bela vista para o Canal de Santos",
    ],
    gallery: [
      `${UP2104}/IMG_9372-660x660.jpg`,
      `${UP2104}/IMG_9371-660x660.jpg`,
      `${UP2104}/IMG_9367-660x660.jpg`,
      `${UP2104}/IMG_9364-660x660.jpg`,
      `${UP2104}/IMG_9362-660x660.jpg`,
      `${UP2104}/IMG_9360-660x660.jpg`,
      `${UP2104}/IMG_9270-660x660.jpg`,
      `${UP2104}/IMG_9264-660x660.jpg`,
      `${UP2104}/IMG_0018-660x660.jpg`,
      `${UP2103}/marina25-660x528.jpg`,
      `${UP2103}/marina6-660x528.jpg`,
    ],
  },
  internet: {
    slug: "internet",
    nav: "Internet",
    title: "Internet",
    hero: `${UP2103}/internet.jpg`,
    paragraphs: [
      "A Marina é dotada de sistema wireless na área do bar e restaurante. Para utilizar o serviço basta solicitar login e senha diretamente com a administração.",
    ],
    gallery: [
      `${UP2104}/IMG_1260-660x660.jpg`,
      `${UP2104}/IMG_0253-660x660.jpg`,
      `${UP2104}/IMG_0244-660x660.jpg`,
      `${UP2104}/IMG_0241-660x660.jpg`,
    ],
  },
  heliponto: {
    slug: "heliponto",
    nav: "Heliponto",
    title: "Heliponto",
    hero: `${UP2103}/heliponto.jpg`,
    paragraphs: [
      "A Porto Marina Astúrias possui um heliponto devidamente homologado pelo Departamento de Aviação Civil e disponível para pousos e decolagens, inclusive com espaço para estacionamento temporário dos helicópteros.",
      "Para uso é necessário autorização do pouso pela administração.",
    ],
    stats: [{ value: "Zulu 60", label: "Prefixo rádio" }],
    gallery: [
      `${UP2104}/IMG_9641-660x660.jpg`,
      `${UP2104}/IMG_9632-660x660.jpg`,
      `${UP2104}/IMG_9615-660x660.jpg`,
      `${UP2104}/IMG_9592-660x660.jpg`,
      `${UP2104}/IMG_9540-660x660.jpg`,
      `${UP2104}/IMG_9538-660x660.jpg`,
      `${UP2104}/IMG_9537-660x660.jpg`,
      `${UP2104}/IMG_9532-660x660.jpg`,
    ],
  },
  "sala-de-radio": {
    slug: "sala-de-radio",
    nav: "Sala Rádio",
    title: "Sala Rádio",
    hero: `${UP2103}/radio.jpg`,
    paragraphs: [
      "A Marina dispõe de uma moderna sala-rádio, estrategicamente localizada no canal de acesso, para apoiar todas as navegações.",
    ],
    stats: [{ value: "Zulu 60", label: "Prefixo" }],
    gallery: [`${UP2104}/sala-de-radio1-660x660.jpg`, `${UP2104}/IMG_0340-660x660.jpg`, `${UP2104}/IMG_0336-660x660.jpg`],
  },
};
