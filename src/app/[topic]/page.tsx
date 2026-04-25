import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getTopicBySlug } from '@/lib/topics';
import { getArticlesByTopic } from '@/lib/articles';

export const dynamicParams = false;
export async function generateStaticParams() {
  return [{topic:'ia'},{topic:'crypto'},{topic:'cyber'},{topic:'bien-etre'},{topic:'gaming'},{topic:'finance'}];
}
export async function generateMetadata({ params }: { params: { topic: string } }) {
  const topic = getTopicBySlug(params.topic);
  if (!topic) return {};
  return { title: `${topic.name} — Trend Pulse`, description: topic.description };
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopicBySlug(params.topic);
  if (!topic) notFound();
  const articles = getArticlesByTopic(params.topic);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="border-b" style={{background:'var(--hero-gradient)',borderColor:'var(--border)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-2 mb-3 text-xs" style={{color:'var(--text-muted)'}}>
              <Link href="/" className="hover:opacity-70">Accueil</Link><span>/</span>
              <span style={{color:'var(--text-secondary)'}}>{topic.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-5xl sm:text-6xl">{topic.icon}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold" style={{color:'var(--text-primary)'}}>{topic.name}</h1>
                <p className="text-sm mt-1 max-w-lg" style={{color:'var(--text-secondary)'}}>{topic.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map(a => <ArticleCard key={a.slug} article={a} variant="card" />)}
            </div>
          ) : (
            <p className="text-center py-20" style={{color:'var(--text-muted)'}}>Bientôt des articles ici…</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
