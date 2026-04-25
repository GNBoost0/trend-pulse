import Link from 'next/link';
import { Article } from '@/lib/articles';
import { getTopicBySlug } from '@/lib/topics';

interface Props { article: Article; variant?: 'hero' | 'card' | 'compact'; }

export default function ArticleCard({ article, variant = 'card' }: Props) {
  const topic = getTopicBySlug(article.topic);
  const d = new Date(article.date);
  const date = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  const hasImage = !!article.image;

  if (variant === 'hero') return (
    <Link href={`/${article.topic}/${article.slug}`} className="group block">
      <article className="tp-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[300px] sm:min-h-[340px]">
          <div className="lg:col-span-3 relative overflow-hidden" style={{background: hasImage ? 'transparent' : undefined}}>
            {hasImage ? (
              <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${topic?.color} flex items-center justify-center`}>
                <span className="text-[120px] sm:text-[140px] opacity-[0.15] group-hover:opacity-[0.22] transition-all duration-700">{topic?.icon}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)] hidden lg:block" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur text-[11px] font-semibold text-white">
                {topic?.icon} {topic?.name}
              </span>
            </div>
          </div>
          <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-[12px]" style={{color:'var(--text-muted)'}}>
              <time>{date}</time><span>·</span><span>{article.readingTime} min</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold leading-[1.25] mb-3 group-hover:opacity-80 transition-colors line-clamp-3" style={{color:'var(--text-primary)'}}>
              {article.title}
            </h2>
            <p className="text-sm leading-relaxed line-clamp-2" style={{color:'var(--text-secondary)'}}>{article.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );

  if (variant === 'compact') return (
    <Link href={`/${article.topic}/${article.slug}`} className="group block py-3 last:border-0" style={{borderBottom:'1px solid var(--border)'}}>
      <div className="flex gap-4">
        <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden" style={{background:'var(--bg-secondary)'}}>
          {hasImage ? (
            <img src={article.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${topic?.color} flex items-center justify-center`}>
              <span className="text-sm opacity-40">{topic?.icon}</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-semibold leading-snug line-clamp-2 group-hover:opacity-80 transition-colors" style={{color:'var(--text-primary)'}}>
            {article.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1.5 text-[12px]" style={{color:'var(--text-muted)'}}>
            <span>{date}</span><span>·</span><span>{article.readingTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <Link href={`/${article.topic}/${article.slug}`} className="group block">
      <article className="tp-card h-full flex flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden" style={{background:'var(--bg-secondary)'}}>
          {hasImage ? (
            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${topic?.color} flex items-center justify-center`}>
              <span className="text-5xl opacity-[0.15] group-hover:opacity-[0.22] group-hover:scale-110 transition-all duration-500">{topic?.icon}</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 backdrop-blur text-[10px] font-semibold text-white">
              {topic?.icon} {topic?.name}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2 text-[11px]" style={{color:'var(--text-muted)'}}>
            <time>{date}</time><span>·</span><span>{article.readingTime} min</span>
          </div>
          <h3 className="text-[15px] font-bold leading-snug line-clamp-2 mb-2 group-hover:opacity-80 transition-colors" style={{color:'var(--text-primary)'}}>
            {article.title}
          </h3>
          <p className="text-[13px] line-clamp-2 flex-1 leading-relaxed" style={{color:'var(--text-secondary)'}}>{article.description}</p>
        </div>
      </article>
    </Link>
  );
}
