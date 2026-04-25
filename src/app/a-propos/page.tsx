import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { topics } from '@/lib/topics';

export const metadata = { title: 'À propos — Trend Pulse' };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{color:'var(--text-primary)'}}>À propos de Trend Pulse</h1>
          
          <div className="prose-article">
            <p><strong>Trend Pulse</strong>, c'est un média digital né d'une idée simple : l'actualité tech mérite mieux que des articles recyclés et des titres clickbait.</p>

            <h2>Notre mission</h2>
            <p>Chaque jour, nous publions des articles frais, rigoureusement documentés et sourcés sur les sujets qui façonnent notre époque. Pas de remplissage, pas de bullshit — juste de l'information qui compte.</p>

            <h2>Nos rubriques</h2>
            <ul>
              {topics.map(t => (
                <li key={t.id}><strong>{t.icon} {t.name}</strong> — {t.description}</li>
              ))}
            </ul>

            <h2>Notre engagement</h2>
            <ul>
              <li><strong>100% vérité</strong> — Chaque fait est vérifié et sourcé. Aucune information inventée.</li>
              <li><strong>Zéro jargon inutile</strong> — On explique clairement, sans vous prendre pour un idiot.</li>
              <li><strong>Des opinions assumées</strong> — On a des points de vue, et on les argumente.</li>
              <li><strong>Contenu original</strong> — Pas de copier-coller, pas de reformulation d'articles existants.</li>
            </ul>

            <h2>Qui sommes-nous ?</h2>
            <p>Trend Pulse est un projet indépendant, propulsé par l'intelligence artificielle et supervisé par des humains. Notre objectif : démontrer que l'IA peut produire du journalisme de qualité quand elle est bien dirigée.</p>

            <h2>Rejoignez-nous</h2>
            <p>Suivez-nous sur les réseaux sociaux pour ne rien manquer :</p>
            <ul>
              <li>Twitter/X — @TrendPulse_IA, @TrendPulse_Crypto, @TrendPulse_Cyber, @TrendPulse_Bio, @TrendPulse_Gaming</li>
              <li>Inscrivez-vous à notre newsletter pour le récap quotidien</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
