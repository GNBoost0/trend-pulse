import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticle, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { getTopicBySlug, topics } from '@/lib/topics';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ topic: a.topic, slug: a.slug }));
}
export async function generateMetadata({ params }: { params: { topic: string; slug: string } }) {
  const a = getArticle(params.topic, params.slug);
  if (!a) return {};
  return { title: a.title, description: a.description, openGraph: { title: a.title, description: a.description, type: 'article', publishedTime: a.date, images: a.image ? [a.image] : [] } };
}

async function md(s: string) { return (await remark().use(gfm).use(html).process(s)).toString(); }

export default async function ArticlePage({ params }: { params: { topic: string; slug: string } }) {
  const article = getArticle(params.topic, params.slug);
  if (!article) notFound();
  const topic = getTopicBySlug(params.topic);
  const related = getRelatedArticles(article, 5);
  const html_ = await md(article.content);
  const dateStr = new Date(article.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
  const ld = { '@context':'https://schema.org','@type':'Article', headline:article.title, description:article.description, datePublished:article.date, image:article.image, author:{'@type':'Person',name:article.author}, publisher:{'@type':'Organization',name:'DailyTrend'} };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}} />
      <main className="flex-1">
        {/* Hero with image + strong overlay for text readability */}
        <div className="relative border-b" style={{borderColor:'var(--border)'}}>
          {article.image && (
            <div className="absolute inset-0">
              <img src={article.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/50" />
            </div>
          )}
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
            {/* Breadcrumb with text shadow */}
            <div className="flex items-center gap-2 mb-4 text-xs" style={{color:'#ccc', textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link><span>/</span>
              <Link href={`/${params.topic}`} className="hover:text-white transition-colors">{topic?.name}</Link><span>/</span>
              <span className="truncate text-gray-300">{article.title}</span>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium backdrop-blur-sm" style={{background:'rgba(0,0,0,0.4)',color:'#ddd',textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>{t}</span>
              ))}
            </div>
            {/* Title with strong shadow */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] mb-4 text-white" style={{textShadow:'0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)'}}>{article.title}</h1>
            {/* Description with shadow */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-200" style={{textShadow:'0 1px 4px rgba(0,0,0,0.7)'}}>{article.description}</p>
            {/* Meta — blanc pur, bien visible */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-semibold text-white" style={{WebkitTextStroke:'0.8px rgba(0,0,0,0.8)'}}>
              <span className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white">DT</div>
                {article.author}
              </span>
              <time>{dateStr}</time>
              <span>{article.readingTime} min de lecture</span>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-12">
            <article className="flex-1 max-w-3xl prose-article">
              <div dangerouslySetInnerHTML={{__html: html_}} />
            </article>

            <aside className="lg:w-[280px] shrink-0 space-y-8">
              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <h3 className="text-base font-extrabold mb-4" style={{color:'var(--text-primary)'}}>À lire aussi</h3>
                  {related.map(a => <ArticleCard key={a.slug} article={a} variant="compact" />)}
                </div>
              )}

              {/* Topics — cartes comme sur l'accueil */}
              <div>
                <h3 className="text-base font-extrabold mb-4" style={{color:'var(--text-primary)'}}>Rubriques</h3>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map(t => (
                    <Link key={t.id} href={`/${t.slug}`}
                      className="group flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-all hover:opacity-90" style={{background:'var(--bg-secondary)',border:'1px solid var(--border)'}}>
                      <span className="text-2xl group-hover:scale-110 transition-transform">{t.icon}</span>
                      <span className="text-[11px] font-bold text-center leading-tight" style={{color:'var(--text-secondary)'}}>{t.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
