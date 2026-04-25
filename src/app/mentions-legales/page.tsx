import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Mentions légales — DailyTrend' };

export default function MentionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{color:'var(--text-primary)'}}>Mentions légales</h1>
          
          <div className="prose-article">
            <h2>Éditeur du site</h2>
            <p><strong>DailyTrend</strong> est un site d'information à vocation journalistique, édité par Julian COLPART.</p>

            <h2>Hébergement</h2>
            <p>Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>

            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, graphismes, logos) est la propriété de DailyTrend ou de ses contributeurs. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>

            <h2>Données personnelles</h2>
            <p>DailyTrend collecte uniquement l'adresse email des abonnés à la newsletter, dans le seul but d'envoyer le récap quotidien. Ces données ne sont ni vendues, ni partagées avec des tiers.</p>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à <strong>contact@dailytrend.fr</strong>.</p>

            <h2>Cookies</h2>
            <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Des cookies tiers (Google AdSense, analytics) peuvent être déposés pour mesurer l'audience et afficher des publicités personnalisées.</p>

            <h2>Responsabilité</h2>
            <p>DailyTrend s'efforce de fournir des informations exactes et à jour. Néanmoins, le site ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation de ces informations.</p>

            <h2>Contact</h2>
            <p>Pour toute question relative à ces mentions légales : <strong>contact@dailytrend.fr</strong></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
