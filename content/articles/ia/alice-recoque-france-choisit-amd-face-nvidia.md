---
title: "Alice Recoque : pourquoi la France parie sur AMD pour son IA"
description: "Le premier supercalculateur exascale français sera équipé de puces AMD, pas Nvidia. Derrière ce choix technique se cache une bataille stratégique pour la souveraineté numérique de l'Europe."
date: "2026-04-25"
topic: "ia"
tags: ["AMD", "supercalculateur", "Alice Recoque", "souveraineté numérique", "exascale"]
image: "/images/articles/alice-recoque-france-choisit-amd-face-nvidia.jpg"
author: "DailyTrend"
readingTime: 9
---

La France vient de poser un geste fort dans la guerre mondiale des puces IA. Le 16 avril 2026, au ministère de l'Économie à Paris, le gouvernement a officialisé un partenariat stratégique avec AMD pour alimenter Alice Recoque, le premier supercalculateur exascale du pays. Pas de Nvidia. Pas de CUDA. Un choix délibéré, mûri, et chargé de conséquences.

## Alice Recoque : 544 millions d'euros pour entrer dans la cour des géants

Le nom n'a pas été choisi au hasard. Alice Recoque était une pionnière française de l'informatique, conceptrice du mini-ordinateur Mitra 15 dans les années 1970. Son héritage va désormais porter la puissance de calcul française vers un seuil jamais atteint : l'exascale, soit plus d'un milliard de milliards d'opérations par seconde (10¹⁸ flops).

Construit par Eviden (groupe Atos) sur la plateforme BullSequana XH3500, Alice Recoque sera équipé de processeurs AMD EPYC de nouvelle génération (architecture Venice), de GPU AMD Instinct MI430X et de FPGA AMD. Le stockage sera assuré par DDN. Le budget : 544 millions d'euros, cofinancé par EuroHPC JU via le Digital Europe Programme et le consortium Jules Verne qui réunit la France, les Pays-Bas et la Grèce.

La livraison est attendue courant 2026. Alice Recoque sera le deuxième supercalculateur exascale d'Europe, après l'allemand Jupiter mis en service à Jülich fin 2025.

## Pourquoi AMD et pas Nvidia ? Le vrai calcul derrière le choix

C'est la question que tout le monde se pose. Nvidia domine le marché des GPU d'entraînement avec une part estimée à plus de 80%. Sa pile logicielle CUDA est le standard de facto de l'industrie. Chaque labo IA, chaque startup, chaque chercheur compile pour CUDA. Alors pourquoi la France s'en écarte ?

La réponse tient en un mot : **souveraineté**.

CUDA est propriétaire. Son code est fermé. Les développeurs qui bâtissent sur CUDA se verrouillent dans l'écosystème Nvidia. C'est une dépendance technologique comparable à celle que la France observe avec Microsoft dans d'autres secteurs — l'Éducation nationale vient d'ailleurs de renouveler son contrat avec l'entreprise américaine malgré les discours officiels sur l'indépendance numérique.

AMD propose ROCm, une alternative open source qui remplit le même rôle que CUDA sur les puces Instinct. La différence est majeure : le code est en accès libre, modifiable, auditable. Pour un projet financé à 544 millions d'euros d'argent public, le choix de l'open source n'est pas anecdotique. C'est un positionnement politique autant que technique.

Le parc français actuel est largement dominé par Nvidia. Jean Zay, la vitrine IA nationale à Orsay, plafonne à 125,9 pétaflops sous GPU Nvidia. Seul Adastra, à Montpellier, fait déjà tourner du AMD. Alice Recoque visera plus d'un exaflop — soit près de 10 fois la puissance de Jean Zay.

## Les chiffres qui comptent

| Caractéristique | Alice Recoque | Jean Zay (Orsay) | Jupiter (Allemagne) |
|---|---|---|---|
| Puissance | > 1 exaflop | 125,9 pétaflops | ~ 1 exaflop |
| GPU | AMD Instinct MI430X | Nvidia A100/H100 | GPU Intel/Nvidia |
| Processeur | AMD EPYC Venice | Intel Xeon | ARM/SiPearl |
| Budget | 544 M€ | ~ 30 M€ (extensions) | ~ 500 M€ |
| Stack logicielle | ROCm (open source) | CUDA (propriétaire) | Mixte |
| Livraison | Courant 2026 | En service | Fin 2025 |

## Efficacité énergétique : l'argument qui fait pencher la balance

La facture énergétique des datacenters est devenue un sujet politique brûlant. AMD avance des chiffres précis : l'architecture d'Eviden permettra à Alice Recoque de fonctionner avec 25% de racks en moins et jusqu'à 50% de meilleure efficacité énergétique par GPU par rapport aux autres systèmes exascale existants.

Dans un contexte où [la course à l'IA consomme toujours plus d'énergie](/ia/google-investit-40-milliards-anthropic), cet argument pèse lourd. Les datacenters sont déjà pointés du doigt pour leur empreinte carbone, et la loi française sur l'installation de nouveaux centres de données se durcit. Un supercalculateur plus efficient, c'est aussi un projet plus acceptable politiquement.

## À quoi va servir Alice Recoque ?

Les usages prévus dépassent largement le simple entraînement de modèles de langage :

- **Modélisation climatique** : simuler les scénarios de réchauffement avec une précision inédite
- **Médecine personnalisée** : créer des jumeaux numériques de patients pour tester des traitements
- **Innovation dans les matériaux** : concevoir de nouveaux alliages, des batteries plus performantes
- **Énergie** : optimiser les réseaux électriques, simuler la fusion nucléaire
- **Grands modèles d'IA européens** : entraîner des modèles souverains en Europe, loin des GAFAM

Le dernier point est crucial. L'Europe manque cruellement d'infrastructures pour entraîner des modèles de la taille de GPT-4 ou Gemini. Alice Recoque, combiné au projet Jupiter en Allemagne, pourrait changer la donne.

## Le centre d'excellence et l'AI Factory France

Le partenariat ne s'arrête pas au hardware. AMD s'engage à ouvrir l'accès à ses programmes de formation — AMD University Program, AMD AI Developer Program, AMD AI Academy — pour renforcer les compétences des chercheurs, enseignants et développeurs français.

Un centre d'excellence verra également le jour pour soutenir la création de la future AI Factory France. Anne Le Hénanff, chargée du Numérique, a résumé l'enjeu lors de la signature :

> « Il n'y a pas d'IA sans infrastructure. Pour bâtir un avenir numérique solide et durable, il faut agir à tous les niveaux de la chaîne de valeur et diversifier nos partenariats. Je salue l'engagement fort d'AMD à s'impliquer auprès de notre écosystème de start-ups et à contribuer à un environnement plus résilient et innovant. »

## Les risques du pari AMD

Reste que le choix AMD comporte des incertitudes réelles. L'écosystème logiciel autour de ROCm reste moins mature que CUDA. Les développeurs français devront se former, adapter leurs workflows, potentiellement réécrire du code. L'industrie mondiale tourne majoritairement sous CUDA, ce qui complique les transferts de modèles et les benchmarks comparatifs.

Par ailleurs, la promesse de livraison "courant 2026" reste vague. Les projets de cette envergure accumulent souvent des retards. Jupiter, le supercalculateur allemand, a lui-même connu des décalages de planning.

Enfin, Nvidia ne reste pas les bras croisés. La firme de Jensen Huang prépare sa génération suivante de GPU (architecture Rubin), et ses performances pourraient creuser davantage l'écart avec les puces AMD. Le pari français sur AMD sera jugé sur les résultats concrets de la machine, pas sur les promesses des brochures.

## Ce que ça signifie pour l'Europe

Alice Recoque s'inscrit dans une dynamique plus large. L'Europe tente de construire une alternative crédible à la domination américaine et chinoise sur l'IA. Le plan EuroHPC finance plusieurs supercalculateurs exascale sur le continent. La réglementation européenne (AI Act) impose des contraintes que les entreprises américaines n'ont pas chez elles.

Le choix du hardware est un signal politique. En optant pour AMD et ROCm plutôt que Nvidia et CUDA, la France dit deux choses : nous voulons diversifier nos dépendances, et nous croyons que l'open source est un avantage stratégique à long terme.

C'est un pari. Il pourrait s'avérer visionnaire si ROCm rattrape CUDA en maturité. Il pourrait aussi s'avérer coûteux si l'écosystème ne suit pas. Mais dans un monde où chaque puce IA est un levier de puissance, faire un choix conscient plutôt que subir le monopole de facto, c'est déjà une forme de victoire.

## Sources
- [AMD and Eviden to power Europe's new exascale supercomputer](https://ir.amd.com/news-events/press-releases/detail/1267/) — AMD, avril 2026
- [Alice Recoque : la France choisit AMD plutôt que Nvidia](https://www.01net.com/actualites/alice-recoque-la-france-choisit-amd-plutot-que-nvidia-et-ce-nest-pas-un-hasard.html) — 01net, avril 2026
- [EuroHPC JU — Alice Recoque procurement](https://eurohpc-ju.europa.eu/) — Commission européenne, 2025-2026
