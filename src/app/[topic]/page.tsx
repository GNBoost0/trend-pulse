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
  return { title: `${topic.name} — DailyTrend`, description: topic.description };
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopicBySlug(params.topic);
  if (!topic) notFound();
  const articles = getArticlesByTopic(params.topic);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero plein écran — même style que les pages articles */}
        <div className="relative border-b" style={{borderColor:'var(--border)'}}>
          {topic.image && (
            <div className="absolute inset-0">
              <img src={topic.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/50" />
            </div>
          )}
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-xs" style={{color:'#ccc', textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link><span>/</span>
              <span className="text-gray-300">{topic.name}</span>
            </div>
            <span className="text-5xl sm:text-6xl mb-4 inline-block drop-shadow-2xl">{topic.icon}</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] mb-4 text-white" style={{textShadow:'0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)'}}>{topic.name}</h1>
            <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed" style={{color:'#ccc', textShadow:'0 1px 3px rgba(0,0,0,0.6)'}}>{topic.description}</p>
            <div className="mt-3 text-xs" style={{color:'#999', textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>{articles.length} article{articles.length !== 1 ? 's' : ''}</div>
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
