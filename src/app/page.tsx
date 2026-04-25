import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';
import { topics } from '@/lib/topics';

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1, 7);
  const perTopic = topics.map(t => ({
    ...t,
    articles: articles.filter(a => a.topic === t.slug).slice(0, 3),
  })).filter(t => t.articles.length > 0);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          {featured && <ArticleCard article={featured} featured />}
        </section>

        {/* Derniers articles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Derniers articles</h2>
              <p className="text-sm text-gray-500 mt-1">Les actus fraîches du jour</p>
            </div>
            <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(article => (
                <ArticleCard key={`${article.topic}-${article.slug}`} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Les articles arrivent bientôt...</p>
          )}
        </section>

        {/* Topics sections */}
        {perTopic.map(section => (
          <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{section.icon}</span>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{section.name}</h2>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <a href={`/${section.slug}`} className="ml-auto text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">
                Tout voir →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        ))}

        {/* Topics overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-2">5 univers, un seul endroit</h2>
            <p className="text-gray-500">Choisissez votre dose d'actualité</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topics.map(topic => (
              <a
                key={topic.id}
                href={`/${topic.slug}`}
                className={`group glass-card p-6 text-center hover:border-white/20`}
              >
                <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">{topic.icon}</span>
                <h3 className="text-sm font-bold text-white mb-1">{topic.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{topic.description.slice(0, 60)}…</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
