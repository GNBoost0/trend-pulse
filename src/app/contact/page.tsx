import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Contact — DailyTrend' };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{color:'var(--text-primary)'}}>Contact</h1>
          
          <div className="prose-article">
            <p>Une question, une suggestion, un partenariat ou une correction à apporter ? On est à l'écoute.</p>

            <h2>Nous contacter</h2>
            <p>Le moyen le plus simple : envoyez-nous un email à <strong>contact@dailytrend.fr</strong></p>

            <h2>Signaler une erreur</h2>
            <p>L'exactitude est notre priorité. Si vous repérez une information incorrecte, incomplète ou obsolète dans un de nos articles, n'hésitez pas à nous le signaler. On corrige rapidement.</p>

            <h2>Partenariats</h2>
            <p>Vous représentez une marque, un média ou une entreprise tech ? On est ouvert aux collaborations qui apportent de la valeur à nos lecteurs.</p>

            <h2>Réseaux sociaux</h2>
            <p>Retrouvez-nous aussi sur :</p>
            <ul>
              <li><strong>Twitter/X</strong> — @DailyTrend_IA et les comptes par rubrique</li>
              <li><strong>Reddit</strong> — u/DailyTrend</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
