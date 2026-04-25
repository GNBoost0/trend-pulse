import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumb from '@/components/Breadcrumb';
import { AdBanner } from '@/components/Adsense';
import { getTopicBySlug } from '@/lib/topics';
import { getArticlesByTopic, getAllArticles } from '@/lib/articles';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: 'ia' }, { slug: 'crypto' }, { slug: 'cyber' }, { slug: 'bien-etre' }, { slug: 'gaming' }];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return {};
  return { title: `${topic.name} — Articles & Actualités`, description: topic.description };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();
  const articles = getArticlesByTopic(params.slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className={`relative bg-gradient-to-br ${topic.color} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[150px]">{topic.icon}</span>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: topic.name },
            ]} />
            <div className="flex items-center gap-5 mb-4">
              <span className="text-7xl">{topic.icon}</span>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white">{topic.name}</h1>
                <p className="text-white/70 mt-2 text-lg max-w-xl">{topic.description}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-white/50">
              <span>{articles.length} article{articles.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <AdBanner />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {articles.length > 0 ? (
            <>
              {articles[0] && <div className="mb-8"><ArticleCard article={articles[0]} featured /></div>}
              {articles.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(1).map(article => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">{topic.icon}</span>
              <p className="text-gray-500 text-lg">Les articles arrivent bientôt dans cette rubrique...</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
