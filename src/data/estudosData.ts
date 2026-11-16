import { Subject, Repertoire, NewsResource, EnemExam, EssayConnective } from "@/types/estudos";

export const INITIAL_SUBJECTS: Subject[] = [
  // =========================================================================
  // 📐 MATEMÁTICA E SUAS TECNOLOGIAS (15 TÓPICOS ESSENCIAIS DO ENEM)
  // =========================================================================
  {
    id: "matematica",
    name: "Matemática",
    area: "matematica",
    icon: "📐",
    topics: [
      { id: "mat-1", name: "Matemática Básica: Frações, Decimais, Dízimas Periódicas, Potenciação e Radiciação", weight: "alto", status: "dominado" },
      { id: "mat-2", name: "Razão, Proporção, Divisão Proporcional e Regra de Três (Simples e Composta)", weight: "alto", status: "dominado" },
      { id: "mat-3", name: "Porcentagem, Descontos/Acréscimos e Matemática Financeira (Juros Simples e Compostos)", weight: "alto", status: "estudando" },
      { id: "mat-4", name: "Estatística Descritiva: Média Aritmética e Ponderada, Moda, Mediana, Desvio Padrão e Variância", weight: "alto", status: "estudando" },
      { id: "mat-5", name: "Leitura, Interpretação e Análise Crítica de Gráficos (Barras, Setores, Linhas) e Tabelas", weight: "alto", status: "dominado" },
      { id: "mat-6", name: "Geometria Plana: Triângulos (Pitágoras, Semelhança), Quadriláteros, Círculos e Cálculo de Áreas", weight: "alto", status: "estudando" },
      { id: "mat-7", name: "Geometria Espacial: Prismas, Cubos, Paralelepípedos, Cilindros, Pirâmides, Cones e Esferas (Volume e Área Total)", weight: "alto", status: "pendente" },
      { id: "mat-8", name: "Escalas Numéricas e Gráficas: Plantas Arquitetônicas, Mapas e Razão entre Áreas/Volumes", weight: "alto", status: "estudando" },
      { id: "mat-9", name: "Função Afim (1º Grau): Estudo de Sinais, Gráficos, Coeficiente Angular/Linear e Aplicações Práticas", weight: "alto", status: "pendente" },
      { id: "mat-10", name: "Função Quadrática (2º Grau): Raízes, Parábola, Ponto Máximo/Mínimo e Coordenadas do Vértice (Xv, Yv)", weight: "alto", status: "pendente" },
      { id: "mat-11", name: "Probabilidade: Espaço Amostral, Eventos Simples, Eventos Independentes e Probabilidade Condicional", weight: "alto", status: "pendente" },
      { id: "mat-12", name: "Análise Combinatória: Princípio Fundamental da Contagem (PFC), Fatorial, Arranjo, Permutação e Combinação", weight: "medio", status: "pendente" },
      { id: "mat-13", name: "Trigonometria: Triângulo Retângulo (Seno, Cosseno, Tangente), Ângulos Notáveis (30°, 45°, 60°) e Leis dos Cossenos", weight: "medio", status: "pendente" },
      { id: "mat-14", name: "Funções Exponenciais e Logarítmicas: Propriedades dos Logs, Equações e Aplicações no Crescimento Populacional/pH", weight: "medio", status: "pendente" },
      { id: "mat-15", name: "Progressões: Progressão Aritmética (PA) e Progressão Geométrica (PG) - Termo Geral e Soma dos Termos", weight: "medio", status: "pendente" },
    ],
    resources: [
      { id: "res-m1", title: "Curso Completo de Matemática Básica ENEM (Playlist)", provider: "Prof. Ferretto (YouTube)", url: "https://www.youtube.com/playlist?list=PLTPg64KdGgYgFpOfNbyIVPqIlG27v-Y5R", type: "video", description: "A base mais sólida e didática do Brasil para garantir os 800+ em Matemática." },
      { id: "res-m2", title: "Matemática Sem Segredo Passo a Passo", provider: "Gis com Giz (YouTube)", url: "https://www.youtube.com/@Giscomgiz", type: "video", description: "Didática visual e acolhedora para quem tem medo ou bloqueio com contas." },
      { id: "res-m3", title: "Macetes Rápidos & Dicas de Resolução", provider: "Sandro Curió - Dicas de Mat", url: "https://www.youtube.com/@sandrocuriodicasdemat", type: "video", description: "Métodos rápidos para ganhar minutos preciosos durante a prova do ENEM." },
      { id: "res-m4", title: "Canal Equaciona Matemática", provider: "Prof. Paulo Pereira (YouTube)", url: "https://www.youtube.com/@equacionamatematica", type: "video", description: "Resolução detalhada de questões de nível intermediário e avançado do ENEM." },
      { id: "res-m5", title: "Repertório ENEM: Filtro Oficial de Questões", provider: "Repertório ENEM", url: "https://repertorioenem.com.br", type: "questoes", description: "Milhares de questões originais separadas por matéria, assunto e nível de dificuldade." },
      { id: "res-m6", title: "Geometria Dinâmica e Calculadora Gráfica", provider: "GeoGebra Brasil", url: "https://www.geogebra.org/?lang=pt", type: "resumo", description: "Ferramenta interativa visual para enxergar figuras espaciais e gráficos de funções em 3D." },
      { id: "res-m7", title: "Khan Academy: Matemática Interativa Gratuita", provider: "Khan Academy", url: "https://pt.khanacademy.org/math", type: "resumo", description: "Exercícios com feedback imediato e vídeos explicativos em cada erro." },
    ],
  },

  // =========================================================================
  // 🌿 CIÊNCIAS DA NATUREZA: BIOLOGIA (12 TÓPICOS)
  // =========================================================================
  {
    id: "biologia",
    name: "Biologia",
    area: "natureza",
    icon: "🧬",
    topics: [
      { id: "bio-1", name: "Ecologia Básica: Níveis de Organização, Cadeias e Teias Tróficas, Hábitat, Nicho e Pirâmides Ecológicas", weight: "alto", status: "dominado" },
      { id: "bio-2", name: "Relações Ecológicas (Harmônicas e Desarmônicas) e Dinâmica Populacional", weight: "alto", status: "dominado" },
      { id: "bio-3", name: "Ciclos Biogeoquímicos: Ciclo da Água, do Carbono, do Nitrogênio e do Oxigênio", weight: "alto", status: "estudando" },
      { id: "bio-4", name: "Impactos Ambientais: Efeito Estufa, Aquecimento Global, Eutrofização, Chuva Ácida, Desmatamento e Magnificação Trófica", weight: "alto", status: "dominado" },
      { id: "bio-5", name: "Citologia: Estrutura da Membrana Plasmática, Transportes Celulares (Osmose, Difusão, Bomba Na/K) e Organelas Citoplasmáticas", weight: "alto", status: "estudando" },
      { id: "bio-6", name: "Metabolismo Energético: Fotossíntese, Quimiossíntese, Respiração Celular Aeróbica e Fermentação (Lática e Alcoólica)", weight: "alto", status: "estudando" },
      { id: "bio-7", name: "Divisão Celular: Mitose, Meiose, Ciclo Celular, Câncer e Mecanismos de Apoptose", weight: "medio", status: "pendente" },
      { id: "bio-8", name: "Genética: 1ª e 2ª Lei de Mendel, Heredogramas, Codominância, Sistema ABO/Rh e Herança Ligada ao Sexo", weight: "alto", status: "pendente" },
      { id: "bio-9", name: "Biotecnologia: DNA Recombinante, Transgênicos, Clonagem, Eletroforese, Vacinas de RNA/Proteína e Terapia Gênica", weight: "alto", status: "pendente" },
      { id: "bio-10", name: "Fisiologia Humana: Sistemas Digestório, Respiratório, Circulatório, Excretor, Nervoso e Endócrino (Hormônios)", weight: "alto", status: "pendente" },
      { id: "bio-11", name: "Programas de Saúde & Doenças: Viroses (Dengue, COVID, HIV), Bacterioses, Protozooses (Chagas, Malária) e Verminoses", weight: "alto", status: "estudando" },
      { id: "bio-12", name: "Evolução Biológica: Lamarckismo vs Darwinismo, Teoria Sintética (Neodarwinismo), Especiação e Órgãos Homólogos/Análogos", weight: "medio", status: "pendente" },
    ],
    resources: [
      { id: "res-b1", title: "Biologia Total — Ecologia e Impactos Ambientais", provider: "Prof. Jubilut (YouTube)", url: "https://www.youtube.com/@jubilut", type: "video", description: "O canal mais famoso de Biologia, com foco pesado nos temas que mais caem." },
      { id: "res-b2", title: "Biologia Completa com Slides e Resumos", provider: "Prof. Samuel Cunha (YouTube)", url: "https://www.youtube.com/@professorsamuelcunha", type: "video", description: "Aulas com quadro didático impecável, exercícios resolvidos e resumos em PDF." },
      { id: "res-b3", title: "BioExplica — Biologia e Saúde Pública", provider: "Prof. Kennedy Ramos", url: "https://www.youtube.com/@bioexplica", type: "video", description: "Foco especial em viroses, vacinas, fisiologia humana e citologia." },
      { id: "res-b4", title: "Banco de Questões de Biologia ENEM com Gabarito", provider: "Brasil Escola Biologia", url: "https://vestibular.brasilescola.uol.com.br/enem/banco-de-questoes.htm", type: "questoes", description: "Questões oficiais com resoluções comentadas detalhadamente." },
    ],
  },

  // =========================================================================
  // 🌿 CIÊNCIAS DA NATUREZA: QUÍMICA (12 TÓPICOS)
  // =========================================================================
  {
    id: "quimica",
    name: "Química",
    area: "natureza",
    icon: "🧪",
    topics: [
      { id: "qui-1", name: "Estrutura Atômica, Tabela Periódica e Propriedades Periódicas (Raio, Eletronegatividade, Energia de Ionização)", weight: "medio", status: "pendente" },
      { id: "qui-2", name: "Ligações Químicas (Iônica, Covalente e Metálica) e Forças Intermoleculares (Dipolo, Pontes de Hidrogênio, London)", weight: "alto", status: "estudando" },
      { id: "qui-3", name: "Funções Inorgânicas: Ácidos, Bases, Sais e Óxidos (Classificação, Nomenclatura e Reações de Neutralização)", weight: "alto", status: "estudando" },
      { id: "qui-4", name: "Estequiometria: Mol, Massa Molar, Relações de Massa/Volume, Reagente Limitante, Excesso, Pureza e Rendimento", weight: "alto", status: "pendente" },
      { id: "qui-5", name: "Soluções Químicas: Concentração Comum (g/L), Molaridade (mol/L), Título em Massa, Diluição e Mistura de Soluções", weight: "alto", status: "pendente" },
      { id: "qui-6", name: "Termoquímica: Processos Endo e Exotérmicos, Variação de Entalpia (ΔH), Lei de Hess e Energia de Ligação", weight: "alto", status: "pendente" },
      { id: "qui-7", name: "Cinética Química: Fatores que Alteram a Velocidade da Reação (Temperatura, Superfície, Catalisador) e Gráficos de Energia de Ativação", weight: "medio", status: "pendente" },
      { id: "qui-8", name: "Equilíbrio Químico: Constantes Kc e Kp, Deslocamento de Equilíbrio (Princípio de Le Chatelier), pH, pOH e Hidrólise", weight: "alto", status: "pendente" },
      { id: "qui-9", name: "Eletroquímica: Número de Oxidação (Nox), Reações Redox, Pilhas de Daniell, Potencial Padrão, Eletrólise e Corrosão", weight: "alto", status: "pendente" },
      { id: "qui-10", name: "Química Orgânica I: Classificação do Carbono e Cadeias, Hidrocarbonetos e Funções Oxigenadas (Álcool, Aldeído, Cetona, Ácido, Éster, Éter)", weight: "alto", status: "estudando" },
      { id: "qui-11", name: "Química Orgânica II: Funções Nitrogenadas (Aminas, Amidas), Isomeria Plana e Espacial (Cis/Trans e Óptica)", weight: "alto", status: "pendente" },
      { id: "qui-12", name: "Química Ambiental: Petróleo, Biocombustíveis (Etanol, Biodiesel), Polímeros/Plásticos, Sabões/Detergentes e Tratamento de Água", weight: "alto", status: "dominado" },
    ],
    resources: [
      { id: "res-q1", title: "Monstro da Química — Curso Completo ENEM", provider: "Prof. Michel (YouTube)", url: "https://www.youtube.com/@MonstrosdaQuimica", type: "video", description: "O canal mais completo e prático de Química com macetes inesquecíveis." },
      { id: "res-q2", title: "Química em Ação — Foco no ENEM", provider: "Prof. Paulo Valim (YouTube)", url: "https://www.youtube.com/@quimicaemacao", type: "video", description: "Aulas organizadas em módulos com estequiometria e química orgânica do zero." },
      { id: "res-q3", title: "Tabela Periódica Interativa Completa (Ptable)", provider: "Ptable Oficial", url: "https://ptable.com/?lang=pt", type: "resumo", description: "Consulte orbitais, propriedades, estados físicos e isótopos em tempo real." },
    ],
  },

  // =========================================================================
  // 🌿 CIÊNCIAS DA NATUREZA: FÍSICA (12 TÓPICOS)
  // =========================================================================
  {
    id: "fisica",
    name: "Física",
    area: "natureza",
    icon: "⚡",
    topics: [
      { id: "fis-1", name: "Cinemática Escalar: Velocidade Média, Movimento Uniforme (MU), Movimento Variado (MUV) e Interpretação de Gráficos", weight: "medio", status: "pendente" },
      { id: "fis-2", name: "Dinâmica e Leis de Newton: Força Peso, Normal, Tração, Atrito, Força Elástica e Trabalho Mecânico", weight: "alto", status: "pendente" },
      { id: "fis-3", name: "Energia Mecânica: Energia Cinética, Energia Potencial Gravitacional/Elástica e Princípio da Conservação de Energia", weight: "alto", status: "pendente" },
      { id: "fis-4", name: "Estática e Hidrostática: Densidade, Pressão, Princípio de Pascal, Princípio de Arquimedes (Empuxo e Flutuação)", weight: "alto", status: "pendente" },
      { id: "fis-5", name: "Termologia e Calorimetria: Escalas Termométricas, Dilatação Térmica, Calor Sensível (Q = mcΔT), Calor Latente e Trocas de Calor", weight: "alto", status: "estudando" },
      { id: "fis-6", name: "Termodinâmica: Trabalho de um Gás, 1ª e 2ª Lei da Termodinâmica, Máquinas Térmicas e Ciclo de Carnot", weight: "medio", status: "pendente" },
      { id: "fis-7", name: "Óptica Geométrica: Propagação da Luz, Reflexão, Espelhos Planos e Esféricos, Refração, Lentes e Defeitos da Visão Humana", weight: "alto", status: "pendente" },
      { id: "fis-8", name: "Ondulatória: Natureza e Tipos de Ondas, Equação Fundamental (v = λ · f) e Fenômenos (Reflexão, Refração, Difração, Interferência, Polarização)", weight: "alto", status: "estudando" },
      { id: "fis-9", name: "Acústica: Qualidades Fisiológicas do Som (Altura, Intensidade, Timbre), Nível Sonoro (Decibéis), Ressonância e Efeito Doppler", weight: "alto", status: "pendente" },
      { id: "fis-10", name: "Eletrodinâmica I: Corrente Elétrica, Tensão, 1ª e 2ª Lei de Ohm e Associação de Resistores (Série e Paralelo)", weight: "alto", status: "pendente" },
      { id: "fis-11", name: "Eletrodinâmica II: Potência Elétrica, Consumo de Energia Elétrica Residencial (kWh) e Dispositivos de Proteção (Fusíveis/Disjuntores)", weight: "alto", status: "estudando" },
      { id: "fis-12", name: "Eletromagnetismo & Física Moderna Básica: Campo Magnético, Força Magnética, Indução Eletromagnética, Efeito Fotoelétrico e Radiação", weight: "medio", status: "pendente" },
    ],
    resources: [
      { id: "res-f1", title: "Física Completa para o ENEM do Zero", provider: "Prof. Boaro (YouTube)", url: "https://www.youtube.com/@boaro", type: "video", description: "O maior canal de Física do Brasil com playlists completas organizadas por assunto." },
      { id: "res-f2", title: "Física Total para Vestibulares", provider: "Prof. Ivys Urquiza", url: "https://www.youtube.com/@FisicaTotal", type: "video", description: "Aulas focadas na física contextualizada que o ENEM mais cobra." },
      { id: "res-f3", title: "Simuladores Interativos PhET Colorado", provider: "Universidade do Colorado", url: "https://phet.colorado.edu/pt_BR/", type: "resumo", description: "Simule circuitos elétricos, propagação de ondas e trocas de calor interativamente." },
    ],
  },

  // =========================================================================
  // 🏛️ CIÊNCIAS HUMANAS: HISTÓRIA (12 TÓPICOS)
  // =========================================================================
  {
    id: "historia",
    name: "História",
    area: "humanas",
    icon: "🏛️",
    topics: [
      { id: "his-1", name: "Brasil Colônia: Economia Açucareira, Sociedade Patriarcal, Tráfico Negreiro e Resistência Negra (Quilombos)", weight: "alto", status: "dominado" },
      { id: "his-2", name: "Ciclo do Ouro e Tensões Coloniais: Mineração no séc. XVIII, Tributação, Inconfidência Mineira e Conjuração Baiana", weight: "alto", status: "estudando" },
      { id: "his-3", name: "Brasil Império: Vinda da Corte Portuguesa (1808), Independência (1822), Período Regencial e Crise do Segundo Reinado", weight: "alto", status: "pendente" },
      { id: "his-4", name: "República Oligárquica / Velha: Coronelismo, Voto de Cabresto, Café com Leite e Revoltas Sociais (Canudos, Chibata, Vacina)", weight: "alto", status: "estudando" },
      { id: "his-5", name: "Era Vargas (1930-1945): Revolução de 30, Constituição de 34, Estado Novo, Legislação Trabalhista e Industrialização", weight: "alto", status: "pendente" },
      { id: "his-6", name: "Ditadura Militar no Brasil (1964-1985): Golpe, Atos Institucionais (AI-5), Milagre Econômico, Repressão e Movimento Diretas Já", weight: "alto", status: "pendente" },
      { id: "his-7", name: "Nova República & Cidadania: Constituição Cidadã de 1988, Processo de Redemocratização, Plano Real e Políticas de Inclusão", weight: "alto", status: "dominado" },
      { id: "his-8", name: "História Antiga: Democracia e Cidadania Ateniense, República e Império Romano e o Legado Jurídico Ocidental", weight: "medio", status: "dominado" },
      { id: "his-9", name: "Idade Média e Moderna: Sistema Feudal, Igreja Medieval, Renascimento Cultural, Reformas Religiosas e Iluminismo", weight: "medio", status: "pendente" },
      { id: "his-10", name: "Revoluções Burguesas e Industriais: Revolução Francesa, 1ª e 2ª Revolução Industrial e os Impactos nas Relações de Trabalho", weight: "alto", status: "pendente" },
      { id: "his-11", name: "Século XX e Conflitos Globais: Imperialismo na África/Ásia, 1ª e 2ª Guerra Mundial, Regimes Totalitários (Nazifascismo) e Holocausto", weight: "alto", status: "pendente" },
      { id: "his-12", name: "Guerra Fria e Descolonização: Bipolaridade (EUA x URSS), Conflitos Periféricos, Descolonização da África/Ásia e Nova Ordem Mundial", weight: "alto", status: "pendente" },
    ],
    resources: [
      { id: "res-h1", title: "História do Brasil & Geral em Uma Folha", provider: "Débora Aladim (YouTube)", url: "https://www.youtube.com/@DeboraAladim", type: "video", description: "Mapas mentais, resumos cronológicos e macetes clássicos de prova." },
      { id: "res-h2", title: "Canal Parabólica — História Crítica Completa", provider: "Prof. Pedro Renno (YouTube)", url: "https://www.youtube.com/@Parabolica", type: "video", description: "Aulas profundas ideais para conectar história com temas de redação." },
      { id: "res-h3", title: "Atlas Histórico Digital da FGV", provider: "Fundação Getulio Vargas", url: "https://atlas.fgv.br/", type: "resumo", description: "Mapas históricos, documentos de época e verbetes detalhados da história do Brasil." },
    ],
  },

  // =========================================================================
  // 🏛️ CIÊNCIAS HUMANAS: GEOGRAFIA (10 TÓPICOS)
  // =========================================================================
  {
    id: "geografia",
    name: "Geografia",
    area: "humanas",
    icon: "🌍",
    topics: [
      { id: "geo-1", name: "Questões Ambientais Globais e no Brasil: Aquecimento Global, Desmatamento, Queimadas, Crise Hídrica e Lixo Urbano", weight: "alto", status: "dominado" },
      { id: "geo-2", name: "Climatologia: Fatores e Elementos do Clima, Massas de Ar no Brasil, Fenômenos El Niño/La Niña e Tipos de Chuva", weight: "alto", status: "estudando" },
      { id: "geo-3", name: "Biomas e Domínios Morfoclimáticos: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampas (Degradação e Preservação)", weight: "alto", status: "estudando" },
      { id: "geo-4", name: "Geografia Agrária: Estrutura Fundiária Brasileira, Concentração de Terras, Agronegócio de Exportação vs Agricultura Familiar", weight: "alto", status: "pendente" },
      { id: "geo-5", name: "Urbanização e Espaço Urbano: Processo de Metropolização, Conurbação, Gentrificação, Favelização, Mobilidade e Segregação Espacial", weight: "alto", status: "pendente" },
      { id: "geo-6", name: "Demografia: Transição Demográfica no Brasil, Envelhecimento Populacional, Bônus Demográfico e Fluxos Migratórios/Refugiados", weight: "alto", status: "pendente" },
      { id: "geo-7", name: "Matriz Energética: Combustíveis Fósseis (Petróleo e Pré-Sal), Energia Hidrelétrica, Solar, Eólica, Biomassa e Transição Energética", weight: "alto", status: "estudando" },
      { id: "geo-8", name: "Geopolítica Mundial Contemporânea: Tensões EUA-China, Conflito Rússia-Ucrânia, Oriente Médio e Blocos Econômicos (BRICS, UE, Mercosul)", weight: "alto", status: "pendente" },
      { id: "geo-9", name: "Globalização e DIT: Fases da Globalização, Divisão Internacional do Trabalho, Cadeias Globais de Produção e Exclusão Digital", weight: "alto", status: "dominado" },
      { id: "geo-10", name: "Cartografia e Sensoriamento Remoto: Escalas, Fusos Horários, Projeções Cartográficas (Mercator x Peters) e Imagens de Satélite", weight: "medio", status: "pendente" },
    ],
    resources: [
      { id: "res-g1", title: "Geografia Visual e Geopolítica para o ENEM", provider: "Professor Silvester (YouTube)", url: "https://www.youtube.com/@professorsilvester", type: "video", description: "Mapas dinâmicos e conexão de atualidades com o edital do ENEM." },
      { id: "res-g2", title: "Terra Negra — Geografia & Geociências", provider: "Canal Terra Negra (YouTube)", url: "https://www.youtube.com/@TerraNegra", type: "video", description: "Aulas em campo gravadas nos próprios biomas e locais de relevo do Brasil." },
      { id: "res-g3", title: "IBGE Educa — Dados Estatísticos Oficiais", provider: "IBGE Oficial", url: "https://educa.ibge.gov.br/", type: "resumo", description: "Mapas, censos, pirâmides etárias e estatísticas oficiais indispensáveis." },
    ],
  },

  // =========================================================================
  // 🏛️ CIÊNCIAS HUMANAS: FILOSOFIA & SOCIOLOGIA (9 TÓPICOS)
  // =========================================================================
  {
    id: "filosofia-sociologia",
    name: "Filosofia & Sociologia",
    area: "humanas",
    icon: "💭",
    topics: [
      { id: "fil-1", name: "Filosofia Antiga: Sócrates (Maiêutica), Platão (Mundo das Ideias e Mito da Caverna) e Aristóteles (Ética a Nicômaco)", weight: "alto", status: "dominado" },
      { id: "fil-2", name: "Filosofia Política Contratualista: Thomas Hobbes (Leviatã), John Locke (Direitos Naturais) e Jean-Jacques Rousseau (Bom Selvagem)", weight: "alto", status: "dominado" },
      { id: "fil-3", name: "Teoria do Conhecimento: Racionalismo Cartesiano (Descartes), Empirismo (Locke, Hume) e o Iluminismo de Immanuel Kant", weight: "medio", status: "pendente" },
      { id: "fil-4", name: "Filosofia Contemporânea: Nietzsche (Crítica à Moral), Hannah Arendt (Banalização do Mal) e Foucault (Microfísica do Poder/Biopolítica)", weight: "alto", status: "estudando" },
      { id: "soc-1", name: "Sociologia Clássica: Émile Durkheim (Fato Social e Anomia), Max Weber (Ação Social e Tipos de Dominação) e Karl Marx (Materialismo e Classes)", weight: "alto", status: "estudando" },
      { id: "soc-2", name: "Sociologia Contemporânea: Zygmunt Bauman (Modernidade Líquida), Pierre Bourdieu (Habitus e Capital Cultural) e Byung-Chul Han", weight: "alto", status: "dominado" },
      { id: "soc-3", name: "Indústria Cultural & Teoria Crítica: Theodor Adorno e Max Horkheimer (Cultura de Massa, Padronização e Alienação)", weight: "alto", status: "estudando" },
      { id: "soc-4", name: "Pensamento Social Brasileiro: Sérgio Buarque de Holanda (Homem Cordial), Gilberto Dimenstein (Cidadão de Papel) e Milton Santos", weight: "alto", status: "dominado" },
      { id: "soc-5", name: "Movimentos Sociais, Cidadania e Relações de Gênero/Raça: Lélia Gonzalez, Djamila Ribeiro e a Luta Antirracista/Feminista", weight: "alto", status: "dominado" },
    ],
    resources: [
      { id: "res-fs1", title: "Filosofia e Sociologia Descomplicada", provider: "Se Liga Nessa História (YouTube)", url: "https://www.youtube.com/@seliganessahistoria", type: "video", description: "Vídeos curtos conectando teorias clássicas com a realidade moderna." },
      { id: "res-fs2", title: "Canal Parabólica: Pensamento Filosófico e Social", provider: "Prof. Pedro Renno", url: "https://www.youtube.com/@Parabolica", type: "video", description: "Playlists completas sobre contratualistas, iluministas e sociologia brasileira." },
    ],
  },

  // =========================================================================
  // 📖 LINGUAGENS, CÓDIGOS & LITERATURA (10 TÓPICOS)
  // =========================================================================
  {
    id: "linguagens",
    name: "Linguagens & Literatura",
    area: "linguagens",
    icon: "📖",
    topics: [
      { id: "lin-1", name: "Interpretação e Compreensão Textual: Inferência, Intencionalidade Discursiva, Tipologia e Gêneros Textuais Diversos", weight: "alto", status: "dominado" },
      { id: "lin-2", name: "Funções da Linguagem: Emotiva, Conativa/Apelativa, Referencial, Metalinguística, Fática e Poética", weight: "alto", status: "estudando" },
      { id: "lin-3", name: "Figuras de Linguagem: Metáfora, Metonímia, Antítese, Paradoxo, Ironia, Hipérbole, Eufemismo e Prosopopeia", weight: "alto", status: "dominado" },
      { id: "lin-4", name: "Variação Linguística: Variação Regional, Social, Histórica e Situacional (Combate ao Preconceito Linguístico)", weight: "alto", status: "dominado" },
      { id: "lin-5", name: "Literatura Colonial e Século XIX: Romantismo Brasileiro (1ª, 2ª e 3ª Geração) e Realismo/Naturalismo (Machado de Assis e Aluísio Azevedo)", weight: "alto", status: "estudando" },
      { id: "lin-6", name: "Pré-Modernismo: Euclides da Cunha (Os Sertões), Lima Barreto (Cidadania e Marginalização) e Monteiro Lobato", weight: "alto", status: "pendente" },
      { id: "lin-7", name: "Modernismo Brasileiro - 1ª Fase (1922): Semana de Arte Moderna, Ruptura Estética, Mário de Andrade, Oswald de Andrade e Manuel Bandeira", weight: "alto", status: "estudando" },
      { id: "lin-8", name: "Modernismo Brasileiro - 2ª Fase (Geração de 30): Graciliano Ramos (Vidas Secas), Carlos Drummond de Andrade, Vinicius de Moraes e Jorge Amado", weight: "alto", status: "pendente" },
      { id: "lin-9", name: "Modernismo - 3ª Fase e Literatura Contemporânea: Clarice Lispector, Guimarães Rosa, Conceição Evaristo e Carolina Maria de Jesus", weight: "alto", status: "pendente" },
      { id: "lin-10", name: "Artes Visuais, Vanguardas Europeias e Música Popular Brasileira (MPB, Tropicália e Rap Nacional como Crítica Social)", weight: "alto", status: "pendente" },
    ],
    resources: [
      { id: "res-l1", title: "Gramática e Interpretação Textual do Zero", provider: "Prof. Noslen (YouTube)", url: "https://www.youtube.com/@ProfessorNoslen", type: "video", description: "O maior canal de Língua Portuguesa do mundo com foco no estilo ENEM." },
      { id: "res-l2", title: "Literatura Brasileira em Foco", provider: "Literatura com Alencar (YouTube)", url: "https://www.youtube.com/@literaturacom", type: "video", description: "Análises críticas das principais obras e movimentos artísticos cobrados na prova." },
      { id: "res-l3", title: "Banco Oficial de Questões de Linguagens INEP", provider: "Repertório ENEM", url: "https://repertorioenem.com.br", type: "questoes", description: "Treine a interpretação de tirinhas, cartazes publicitários e poemas do ENEM." },
    ],
  },
];

// =========================================================================
// 💎 15 REPERTÓRIOS CORINGAS DE ALTA PERFORMANCE PARA QUALQUER TEMA
// =========================================================================
export const CORINGA_REPERTOIRES: Repertoire[] = [
  {
    id: "rep-1",
    title: "Constituição Cidadã de 1988 (Artigo 6º)",
    author: "Legislação Brasileira",
    category: "Legislação",
    concept: "A Carta Magna garante a todos os brasileiros direitos fundamentais inalienáveis, como educação, saúde, alimentação, trabalho, moradia, transporte, segurança e proteção social.",
    themes: "Praticamente qualquer tema de negligência governamental, saúde, saneamento, educação, moradia ou direitos básicos.",
    quoteOrExample: "A Constituição Federal de 1988 — norma jurídica de máxima hierarquia no país — assegura, em seu artigo 6º, o direito à [inserir direito do tema] como prerrogativa de todo cidadão. Contudo, na contemporaneidade brasileira, a persistência de [problema do tema] evidencia a dissonância entre a teoria constitucional e a realidade fática vivenciada pela população.",
  },
  {
    id: "rep-2",
    title: "O Cidadão de Papel",
    author: "Gilberto Dimenstein (Jornalista e Escritor)",
    category: "Sociologia",
    concept: "Dimenstein demonstra que no Brasil as leis são avançadas e garantistas, todavia não saem da teoria, tornando os indivíduos 'cidadãos apenas no papel' desprovidos de amparo prático.",
    themes: "Invisibilidade de minorias, desigualdades sociais, barreiras de acessibilidade, descaso com infância ou idosos.",
    quoteOrExample: "Segundo Gilberto Dimenstein, em sua obra 'O Cidadão de Papel', a legislação brasileira é farta em assegurar garantias, todavia falha em torná-las palpáveis, gerando cidadãos apenas no papel. De maneira análoga, nota-se que [problema do tema] reflete essa fragilidade institucional, uma vez que...",
  },
  {
    id: "rep-3",
    title: "Modernidade Líquida & Laços Fragilizados",
    author: "Zygmunt Bauman (Sociólogo)",
    category: "Sociologia",
    concept: "As relações humanas e os valores comunitários tornaram-se fluidos, efêmeros e individualistas. A falta de solidariedade coletiva normaliza o sofrimento do próximo.",
    themes: "Consumismo, vício em telas/redes sociais, solidão contemporânea, indiferença coletiva com vulneráveis, saúde mental.",
    quoteOrExample: "O sociólogo polonês Zygmunt Bauman, ao conceber a teoria da 'Modernidade Líquida', ressalta que as relações humanas e o senso comunitário tornaram-se frágeis e individualistas. Sob essa ótica, a indiferença social perante [problema do tema] comprova como o descaso coletivo corrói o compromisso cívico com o outro.",
  },
  {
    id: "rep-4",
    title: "A Banalização do Mal",
    author: "Hannah Arendt (Filósofa)",
    category: "Filosofia",
    concept: "Quando uma injustiça ou mazela social crônica se repete continuamente e a sociedade se acostuma, a população passa a naturalizar e ignorar passivamente a dor alheia.",
    themes: "Violência crônica, trabalho análogo à escravidão, moradores de rua, preconceitos enraizados, desastres ambientais repetitivos.",
    quoteOrExample: "Conforme elucidou a filósofa Hannah Arendt no conceito da 'Banalização do Mal', situações degradantes tornam-se rotineiras a ponto de a coletividade passar a considerá-las naturais. Nesse sentido, a tolerância passiva diante de [problema do tema] evidencia a perigosa normalização de uma mazela que deveria gerar indignação imediata.",
  },
  {
    id: "rep-5",
    title: "O Contrato Social & A Quebra do Pacto",
    author: "Thomas Hobbes (Filósofo Contratualista)",
    category: "Filosofia",
    concept: "O Estado foi instituído mediante um pacto social no qual o poder público deve garantir a ordem, a segurança e a dignidade coletiva. O descaso estatal é uma quebra unilateral desse contrato.",
    themes: "Omissão estatal, fiscalização insuficiente, falta de verbas públicas para áreas prioritárias.",
    quoteOrExample: "Para o filósofo contratualista Thomas Hobbes, o Estado possui a obrigação primordial de zelar pelo bem-estar e pela ordem social de seus indivíduos. No entanto, quando o poder público se abstém de criar mecanismos eficazes para combater [problema do tema], ocorre uma quebra unilateral desse pacto social, desamparando os cidadãos.",
  },
  {
    id: "rep-6",
    title: "Declaração Universal dos Direitos Humanos (1948)",
    author: "Organização das Nações Unidas (ONU)",
    category: "Legislação",
    concept: "Proclama que todos os seres humanos nascem livres e iguais em dignidade e direitos, devendo ser protegidos contra qualquer forma de discriminação, violência ou segregação.",
    themes: "Intolerância religiosa, racismo, etarismo, capacitismo, violência contra mulheres e povos tradicionais.",
    quoteOrExample: "A Declaração Universal dos Direitos Humanos de 1948, em seu primeiro artigo, postula que todos os indivíduos nascem livres e iguais em dignidade e direitos. Não obstante, o cenário atual de [problema do tema] no Brasil desrespeita essa premissa global ao marginalizar grupos históricos que merecem proteção integral.",
  },
  {
    id: "rep-7",
    title: "A Sociedade do Cansaço",
    author: "Byung-Chul Han (Filósofo)",
    category: "Filosofia",
    concept: "Na sociedade do desempenho, a cobrança por produtividade e sucesso a qualquer preço gera patologias psíquicas graves, como depressão, ansiedade e exaustão crônica (burnout).",
    themes: "Saúde mental de jovens e trabalhadores, pressão escolar/vestibular, redes sociais, esgotamento e suicídio.",
    quoteOrExample: "Em 'A Sociedade do Cansaço', o filósofo Byung-Chul Han alerta que a obsessão hodierna pela hiperprodutividade produz severas patologias neuronais. Esse quadro dialoga diretamente com [tema], visto que a pressão social desmedida negligencia os limites humanos fundamentais.",
  },
  {
    id: "rep-8",
    title: "Pedagogia da Autonomia",
    author: "Paulo Freire (Patrono da Educação Brasileira)",
    category: "Sociologia",
    concept: "A educação não deve ser mera transmissão mecânica de conteúdos ('educação bancária'), mas sim uma prática libertadora que estimula o pensamento crítico e a cidadania ativa.",
    themes: "Evasão escolar, analfabetismo funcional, educação midiática, desvalorização da ciência e dos professores.",
    quoteOrExample: "Segundo o educador Paulo Freire, patrono da educação brasileira, ensinar não é transferir conhecimento, mas criar as possibilidades para a sua própria produção e libertação crítica. Em contrapartida, as deficiências em torno de [problema do tema] reforçam uma formação passiva que impede os jovens de questionarem as desigualdades vigentes.",
  },
  {
    id: "rep-9",
    title: "Cidadanias Mutiladas & Território Usado",
    author: "Milton Santos (Maior Geógrafo do Brasil)",
    category: "Sociologia",
    concept: "O espaço geográfico brasileiro é profundamente desigual: dependendo de onde o indivíduo nasce e vive (periferias, sertões), sua cidadania é incompleta e amputada.",
    themes: "Segregação socioespacial, saneamento básico, mobilidade urbana, acesso à internet e cultura nas periferias.",
    quoteOrExample: "O eminente geógrafo Milton Santos formulou o conceito de 'Cidadanias Mutiladas' ao constatar que o acesso aos direitos no Brasil é condicionado pelo espaço em que a pessoa habita. Nessa perspectiva, as barreiras enfrentadas para superar [problema do tema] atingem de forma desproporcional as periferias, perpetuando abismos territoriais.",
  },
  {
    id: "rep-10",
    title: "Violência Simbólica & Reprodução Social",
    author: "Pierre Bourdieu (Sociólogo Francês)",
    category: "Sociologia",
    concept: "As desigualdades não são mantidas apenas pela força física, mas por mecanismos sutis e invisíveis de dominação cultural e social que levam o oprimido a aceitar a própria condição.",
    themes: "Preconceitos velados, desvalorização de culturas populares, elitismo acadêmico, barreiras invisíveis no mercado de trabalho.",
    quoteOrExample: "Para o sociólogo Pierre Bourdieu, a 'Violência Simbólica' se manifesta quando estruturas desiguais são perpetuadas de forma tão dissimulada que os próprios indivíduos dominados passam a aceitá-las como naturais. Esse raciocínio elucida como [problema do tema] se mantém enraizado nas práticas cotidianas do país.",
  },
  {
    id: "rep-11",
    title: "O Mito da Democracia Racial & Amefricanidade",
    author: "Lélia Gonzalez (Antropóloga e Intelectual Negra)",
    category: "Sociologia",
    concept: "Denuncia a falsa ideia de que no Brasil não há preconceito, mostrando que o racismo e o machismo atuam de forma combinada para manter mulheres negras e periféricas na base da pirâmide.",
    themes: "Racismo estrutural, desigualdade salarial de gênero, violência contra a mulher negra, invisibilidade cultural.",
    quoteOrExample: "A intelectual brasileira Lélia Gonzalez desconstruiu a falácia da 'democracia racial' ao evidenciar as interseções danosas entre o racismo e o machismo na história do país. Sob esse viés, a vulnerabilidade vivenciada em [problema do tema] reflete a herança colonial que ainda subalterniza parcelas expressivas da população.",
  },
  {
    id: "rep-12",
    title: "O Perigo de uma História Única",
    author: "Chimamanda Ngozi Adichie (Escritora Nigeriana)",
    category: "Literatura",
    concept: "Quando a sociedade consome apenas uma narrativa sobre um povo, região ou grupo vulnerável, criam-se estereótipos redutores que roubam a dignidade e a complexidade das pessoas.",
    themes: "Estereótipos sobre o Nordeste, visão colonial sobre povos indígenas, preconceito com periferias, estigmas de saúde mental.",
    quoteOrExample: "Em sua aclamada conferência 'O Perigo de uma História Única', a escritora Chimamanda Ngozi Adichie alerta que narrativas hegemônicas e simplistas produzem estereótipos danosos e desumanizadores. De maneira análoga, a estigmatização de [grupo/tema] decorre da propagação de uma visão restrita que apaga sua real complexidade e potência.",
  },
  {
    id: "rep-13",
    title: "O Povo Brasileiro & A Matriz da Desigualdade",
    author: "Darcy Ribeiro (Antropólogo e Educador)",
    category: "História",
    concept: "O Brasil foi moldado como uma empresa de exploração colonial violenta, criando uma elite descompromissada com o bem-estar do próprio povo e uma estrutura social excludente.",
    themes: "Questão agrária, destruição de terras indígenas, desmonte da escola pública, desigualdade histórica de renda.",
    quoteOrExample: "Conforme diagnosticou o antropólogo Darcy Ribeiro na obra 'O Povo Brasileiro', o processo civilizatório nacional foi erguido sobre a exploração predatória e o desprezo das elites pelos setores populares. Nesse contexto, a persistência de [problema do tema] não é um acidente, mas sim o resultado histórico de um projeto excludente de nação.",
  },
  {
    id: "rep-14",
    title: "O Homem Cordial",
    author: "Sérgio Buarque de Holanda (Historiador)",
    category: "História",
    concept: "Na obra 'Raízes do Brasil', explica que o brasileiro age frequentemente movido pelo coração (laços afetivos e familiares) em detrimento das regras formais e do interesse público republicano.",
    themes: "Patrimonialismo, jeitinho brasileiro lesivo, corrupção, nepotismo, falta de rigor no cumprimento de leis sanitárias ou ambientais.",
    quoteOrExample: "No clássico 'Raízes do Brasil', Sérgio Buarque de Holanda cunhou o conceito de 'Homem Cordial' para descrever a tendência de sobrepor relações pessoais e emocionais ao interesse coletivo e às leis republicanas. Esse traço cultural corrobora para que [problema do tema] continue sendo negligenciado por parte do tecido social.",
  },
  {
    id: "rep-15",
    title: "Biopolítica & O Poder sobre os Corpos",
    author: "Michel Foucault (Filósofo Francês)",
    category: "Filosofia",
    concept: "O Estado moderno não apenas pune, mas gerencia e controla os corpos da população através de políticas públicas que determinam quem pode viver com plenitude e quem é deixado morrer.",
    themes: "Crise no SUS, mortalidade materna em hospitais públicos, violência policial, descarte de populações vulneráveis.",
    quoteOrExample: "O pensador Michel Foucault, por meio da teoria da 'Biopolítica', expõe que o Estado contemporâneo exerce poder ao gerenciar quais vidas merecem investimentos prioritários e quais são negligenciadas. Essa premissa se aplica à conjuntura de [problema do tema], na qual a ausência de amparo estatal escancara o abandono de parcelas desfavorecidas.",
  },
];

// =========================================================================
// 📝 AS ÚLTIMAS 5 PROVAS OFICIAIS DO ENEM (2021 A 2025)
// =========================================================================
export const PREVIOUS_ENEM_EXAMS: EnemExam[] = [
  {
    id: "enem-2025",
    year: 2025,
    edition: "ENEM 2025 (Edição Regular)",
    essayTheme: "Tema Oficial da Aplicação Regular ENEM 2025",
    day1QuestionsUrl: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
    day1AnswerKeyUrl: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
    day2QuestionsUrl: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
    day2AnswerKeyUrl: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
    videoResolutionUrl: "https://www.youtube.com/results?search_query=resolucao+enem+2025+comentada",
    completed: false,
  },
  {
    id: "enem-2024",
    year: 2024,
    edition: "ENEM 2024 (Edição Regular)",
    essayTheme: "Desafios para a valorização da herança africana no Brasil",
    day1QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_PV_impresso_D1_CD1.pdf",
    day1AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_GB_impresso_D1_CD1.pdf",
    day2QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_PV_impresso_D2_CD5.pdf",
    day2AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_GB_impresso_D2_CD5.pdf",
    videoResolutionUrl: "https://www.youtube.com/results?search_query=correcao+ao+vivo+enem+2024",
    completed: false,
  },
  {
    id: "enem-2023",
    year: 2023,
    edition: "ENEM 2023 (Edição Regular)",
    essayTheme: "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
    day1QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D1_CD1.pdf",
    day1AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_GB_impresso_D1_CD1.pdf",
    day2QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D2_CD5.pdf",
    day2AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_GB_impresso_D2_CD5.pdf",
    videoResolutionUrl: "https://www.youtube.com/results?search_query=resolucao+completa+enem+2023",
    completed: false,
  },
  {
    id: "enem-2022",
    year: 2022,
    edition: "ENEM 2022 (Edição Regular)",
    essayTheme: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    day1QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_PV_impresso_D1_CD1.pdf",
    day1AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_GB_impresso_D1_CD1.pdf",
    day2QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_PV_impresso_D2_CD5.pdf",
    day2AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_GB_impresso_D2_CD5.pdf",
    videoResolutionUrl: "https://www.youtube.com/results?search_query=resolucao+enem+2022+comentada",
    completed: false,
  },
  {
    id: "enem-2021",
    year: 2021,
    edition: "ENEM 2021 (Edição Regular)",
    essayTheme: "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil",
    day1QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf",
    day1AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_GB_impresso_D1_CD1.pdf",
    day2QuestionsUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D2_CD5.pdf",
    day2AnswerKeyUrl: "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_GB_impresso_D2_CD5.pdf",
    videoResolutionUrl: "https://www.youtube.com/results?search_query=correcao+completa+enem+2021",
    completed: false,
  },
];

// =========================================================================
// 🔤 BANCO DE CONECTIVOS NOTA 1000 DO ENEM (OPERADORES ARGUMENTATIVOS)
// =========================================================================
export const ESSAY_CONNECTIVES: EssayConnective[] = [
  {
    category: "Início do Parágrafo de Desenvolvimento 1 (D1)",
    purpose: "Introduzir a primeira linha de argumentação do texto.",
    examples: ["Em primeiro plano,", "A princípio,", "De início,", "Sob esse viés,", "Nesse contexto inicial,"],
  },
  {
    category: "Início do Parágrafo de Desenvolvimento 2 (D2) - Adição",
    purpose: "Adicionar um segundo argumento convergente com o primeiro.",
    examples: ["Ademais,", "Outrossim,", "Além disso,", "Paralelamente a isso,", "Vale ressaltar, outrossim,"],
  },
  {
    category: "Início do Parágrafo de Desenvolvimento 2 (D2) - Oposição",
    purpose: "Apresentar um contraponto crítico ou contraste.",
    examples: ["Em contrapartida,", "Por outro lado,", "Contudo,", "No entanto,", "Não obstante,"],
  },
  {
    category: "Introdução de Repertório Sociocultural",
    purpose: "Ancorar a teoria sociológica, lei ou filósofo ao seu parágrafo.",
    examples: ["Conforme preconiza [Autor],", "Sob a perspectiva de [Autor],", "De acordo com [Documento],", "Análogo ao pensamento de [Autor],"],
  },
  {
    category: "Início da Proposta de Intervenção (Conclusão)",
    purpose: "Iniciar o fechamento do texto e a solução para os problemas.",
    examples: ["Portanto,", "Infere-se, portanto,", "Depreende-se, desse modo,", "Torna-se imperioso, pois,"],
  },
];

// =========================================================================
// 📰 RADAR DE ATUALIDADES & NOTÍCIAS PARA O ENEM
// =========================================================================
export const NEWS_RESOURCES: NewsResource[] = [
  {
    id: "news-1",
    title: "G1 Educação & Guia do Estudante",
    source: "G1 & Guia do Estudante",
    url: "https://g1.globo.com/educacao/enem/",
    type: "portal",
    description: "Notícias oficiais sobre editais, cronograma do ENEM, temas quentes de redação e análises dos melhores professores do país.",
  },
  {
    id: "news-2",
    title: "Agência Brasil — Dados e Notícias Oficiais (EBC)",
    source: "Governo Federal / Imprensa Oficial",
    url: "https://agenciabrasil.ebc.com.br/",
    type: "portal",
    description: "Excelente fonte primária para repertório com dados estatísticos e reportagens neutras sobre saúde, meio ambiente e educação.",
  },
  {
    id: "news-3",
    title: "Podcast 'O Assunto' (15-20 min diários)",
    source: "Globoplay / Spotify",
    url: "https://g1.globo.com/podcast/o-assunto/",
    type: "podcast",
    description: "Mergulho profundo no tema social ou político mais relevante do Brasil a cada dia, perfeito para escutar no trajeto ou relaxando.",
  },
  {
    id: "news-4",
    title: "Podcast 'Café da Manhã' (Folha de S.Paulo)",
    source: "Folha de S.Paulo / Spotify",
    url: "https://www1.folha.uol.com.br/podcasts/cafe-da-manha/",
    type: "podcast",
    description: "Resumo matinal em áudio sobre economia, tensões geopolíticas e sociedade com especialistas de renome.",
  },
  {
    id: "news-5",
    title: "Nexo Jornal — Gráficos e Jornalismo Explicativo",
    source: "Nexo Jornal",
    url: "https://www.nexojornal.com.br/",
    type: "portal",
    description: "Infográficos elegantes e explicações claras sobre problemas sociais complexos da realidade brasileira.",
  },
];

// =========================================================================
// 🎯 OS 5 ELEMENTOS DA PROPOSTA DE INTERVENÇÃO (C5)
// =========================================================================
export const INTERVENTION_ELEMENTS = [
  { element: "1. Agente", question: "Quem fará?", example: "Ministério da Educação (MEC), Ministério da Saúde, Famílias, Escolas, ONGs, Mídia." },
  { element: "2. Ação", question: "O que fará?", example: "Deve criar campanhas socioeducativas; deve implementar oficinas lúdicas de debate..." },
  { element: "3. Meio / Modo", question: "Como fará?", example: "Por intermédio de parcerias público-privadas; mediante palestras e uso de recursos audiovisuais..." },
  { element: "4. Efeito / Finalidade", question: "Para quê?", example: "A fim de desconstruir o estigma histórico; com o fito de garantir o pleno acesso à cidadania..." },
  { element: "5. Detalhamento", question: "Explicação extra de um dos 4 itens", example: "Explicar a atuação do Agente ('órgão responsável pela garantia dos direitos básicos') ou detalhar a Ação." },
];
