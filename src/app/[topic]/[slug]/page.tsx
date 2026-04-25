import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ArticleCard from '@/components/ArticleCard';
import { AdBanner, AdInArticle, AdSidebar } from '@/components/Adsense';
import { getArticle, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { getTopicBySlug, topics } from '@/lib/topics';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ topic: a.topic, slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { topic: string; slug: string } }) {
  const article = getArticle(params.topic, params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: { title: article.title, description: article.description, type: 'article', publishedTime: article.date, authors: [article.author], tags: article.tags },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description },
  };
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(html).process(content);
  return result.toString();
}

export default async function ArticlePage({ params }: { params: { topic: string; slug: string } }) {
  const article = getArticle(params.topic, params.slug);
  if (!article) notFound();
  const topic = getTopicBySlug(params.topic);
  const related = getRelatedArticles(article);
  const contentHtml = await markdownToHtml(article.content);
  const parts = contentHtml.split(/(<\/p>)/);
  const mid = Math.ceil(parts.length / 2);
  const firstHalf = parts.slice(0, mid * 2).join('');
  const secondHalf = parts.slice(mid * 2).join('');
  const dateObj = new Date(article.date);
  const dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.description, datePublished: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: 'Trend Pulse' },
    mainEntityOfPage: `https://trend-pulse.vercel.app/${params.topic}/${params.slug}`,
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className={`relative bg-gradient-to-br ${topic?.color || 'from-brand-500 to-brand-700'} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px]">{topic?.icon}</span>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-20">
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: topic?.name || '', href: `/${params.topic}` },
              { label: article.title },
            ]} />
            <div className="flex flex-wrap gap-2 mb-5">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white/90 backdrop-blur-sm">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-5">{article.title}</h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl">{article.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">TP</div>
                {article.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" /><time>{dateStr}</time>
              <span className="w-1 h-1 rounded-full bg-white/30" /><span>{article.readingTime} min de lecture</span>
            </div>
          </div>
        </div>
        <AdBanner />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <article className="flex-1 max-w-3xl prose-article">
              <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
              <AdInArticle />
              <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
            </article>
            <aside className="lg:w-[320px] shrink-0 space-y-8">
              <AdSidebar />
              {related.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-500 rounded-full" />À lire aussi
                  </h3>
                  <div>{related.map(a => <ArticleCard key={a.slug} article={a} compact />)}</div>
                </div>
              )}
              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-brand-500 rounded-full" />Rubriques
                </h3>
                <div className="space-y-1">
                  {topics.map(t => (
                    <a key={t.id} href={`/${t.slug}`} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <span className="text-lg group-hover:scale-110 transition-transform">{t.icon}</span>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{t.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
