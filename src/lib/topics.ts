export const topics = [
  {
    id: 'ia',
    name: 'Intelligence Artificielle',
    slug: 'ia',
    icon: '🤖',
    color: 'from-purple-500 to-indigo-600',
    description: 'Dernières avancées en IA, LLM, machine learning et outils intelligents.',
    twitter: '@TrendPulse_IA',
  },
  {
    id: 'crypto',
    name: 'Crypto & Blockchain',
    slug: 'crypto',
    icon: '💰',
    color: 'from-amber-500 to-orange-600',
    description: 'Marchés crypto, analyses, DeFi, NFT et regulation.',
    twitter: '@TrendPulse_Crypto',
  },
  {
    id: 'cyber',
    name: 'Cybersécurité',
    slug: 'cyber',
    icon: '🛡️',
    color: 'from-emerald-500 to-teal-600',
    description: 'Menaces, protection, VPN, fuites de données et vie privée.',
    twitter: '@TrendPulse_Cyber',
  },
  {
    id: 'bien-etre',
    name: 'Bien-être & Biohacking',
    slug: 'bien-etre',
    icon: '🧬',
    color: 'from-pink-500 to-rose-600',
    description: 'Santé, optimisation, nutrition, sommeil et performance.',
    twitter: '@TrendPulse_Bio',
  },
  {
    id: 'gaming',
    name: 'Gaming & E-sport',
    slug: 'gaming',
    icon: '🎮',
    color: 'from-cyan-500 to-blue-600',
    description: 'Jeux vidéo, tournois, reviews et industry news.',
    twitter: '@TrendPulse_Gaming',
  },
  {
    id: 'finance',
    name: 'Finance & Business',
    slug: 'finance',
    icon: '📈',
    color: 'from-green-500 to-emerald-600',
    description: 'Investissement, assurance, entrepreneuriat, B2B et stratégies financières.',
    twitter: '@TrendPulse_Finance',
  },
] as const;

export type Topic = typeof topics[number];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug);
}
