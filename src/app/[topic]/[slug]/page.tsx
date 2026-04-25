import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticle, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { getTopicBySlug, topics } from '@/lib/topics';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ topic: a.topic, slug: a.slug }));
}
export async function generateMetadata({ params }: { params: { topic: string; slug: string } }) {
  const a = getArticle(params.topic, params.slug);
  if (!a) return {};
  return { title: a.title, description: a.description, openGraph: { title: a.title, description: a.description, type: 'article', publishedTime: a.date } };
}

async function md(s: string) { return (await remark().use(html).process(s)).toString(); }

export default async function ArticlePage({ params }: { params: { topic: string; slug: string } }) {
  const article = getArticle(params.topic, params.slug);
  if (!article) notFound();
  const topic = getTopicBySlug(params.topic);
  const related = getRelatedArticles(article, 5);
  const html_ = await md(article.content);
  const dateStr = new Date(article.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
  const ld = { '@context':'https://schema.org','@type':'Article', headline:article.title, description:article.description, datePublished:article.date, author:{'@type':'Person',name:article.author}, publisher:{'@type':'Organization',name:'Trend Pulse'} };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}} />
      <main className="flex-1">
        {/* Hero */}
        <div className="border-b border-[var(--border)]" style={{background:'var(--hero-gradient)'}}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
            <div className="flex items-center gap-2 mb-4 text-xs" style={{color:'var(--text-muted)'}}>
              <Link href="/" className="hover:opacity-70">Accueil</Link><span>/</span>
              <Link href={`/${params.topic}`} className="hover:opacity-70">{topic?.name}</Link><span>/</span>
              <span className="truncate" style={{color:'var(--text-secondary)'}}>{article.title}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{background:'var(--tag-bg)',color:'var(--tag-text)'}}>{t}</span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] mb-4" style={{color:'var(--text-primary)'}}>{article.title}</h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{color:'var(--text-secondary)'}}>{article.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs" style={{color:'var(--text-muted)'}}>
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[9px] font-bold text-indigo-500">TP</div>
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
              {/* Ad */}
              <div className="aspect-[4/3] rounded-xl flex items-center justify-center text-xs" style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-muted)'}}>
                Espace publicitaire
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{color:'var(--text-muted)'}}>À lire aussi</h3>
                  <div className="space-y-0">
                    {related.map(a => <ArticleCard key={a.slug} article={a} variant="compact" />)}
                  </div>
                </div>
              )}

              {/* Topics */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{color:'var(--text-muted)'}}>Rubriques</h3>
                <div className="space-y-0.5">
                  {topics.map(t => (
                    <Link key={t.id} href={`/${t.slug}`} className="flex items-center gap-2 px-2 py-2 rounded-lg transition-colors hover:opacity-80" style={{color:'var(--text-secondary)'}}>
                      <span className="text-sm">{t.icon}</span>
                      <span className="text-xs">{t.name}</span>
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
