import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';
import { topics } from '@/lib/topics';

export default function Home() {
  const articles = getAllArticles();
  const hero = articles[0];

  return (
    <>
      <Header />
      <main className="flex-1">
        {hero && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{background:'var(--tag-bg)',color:'var(--tag-text)'}}>Articles conseillés du jour</span>
              <div className="flex-1 h-px" style={{background:'var(--border)'}} />
            </div>
            <div className="max-w-md">
              <ArticleCard article={hero} variant="card" />
            </div>
          </section>
        )}

        {topics.map(topic => {
          const topicArticles = articles.filter(a => a.topic === topic.slug);
          if (topicArticles.length === 0) return null;
          
          return (
            <section key={topic.id} className="border-t" style={{borderColor:'var(--border)'}}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{topic.icon}</span>
                    <h2 className="text-sm font-bold" style={{color:'var(--text-primary)'}}>{topic.name}</h2>
                    <span className="text-[11px] px-1.5 py-0.5 rounded" style={{background:'var(--tag-bg)',color:'var(--tag-text)'}}>{topicArticles.length}</span>
                  </div>
                  <Link href={`/${topic.slug}`} className="text-[12px] font-medium text-indigo-500 hover:text-indigo-400 transition-colors">Tout voir →</Link>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide" style={{scrollbarWidth:'none'}}>
                  {topicArticles.slice(0, 7).map(a => (
                    <div key={a.slug} className="snap-start shrink-0 w-[280px] sm:w-[300px]">
                      <ArticleCard article={a} variant="card" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="border-t" style={{borderColor:'var(--border)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{color:'var(--text-muted)'}}>Rubriques</h2>
              <div className="flex-1 h-px" style={{background:'var(--border)'}} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {topics.map(topic => (
                <Link key={topic.id} href={`/${topic.slug}`}
                  className="group flex flex-col items-center gap-2 p-5 rounded-xl transition-all hover:opacity-90" style={{background:'var(--bg-secondary)',border:'1px solid var(--border)'}}>
                  <span className="text-3xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                  <span className="text-xs font-bold transition-colors" style={{color:'var(--text-secondary)'}}>{topic.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
