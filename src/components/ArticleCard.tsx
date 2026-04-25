import Link from 'next/link';
import { Article } from '@/lib/articles';
import { getTopicBySlug } from '@/lib/topics';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}

export default function ArticleCard({ article, featured = false, compact = false }: ArticleCardProps) {
  const topic = getTopicBySlug(article.topic);
  const dateObj = new Date(article.date);
  const dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  if (featured) {
    return (
      <Link href={`/${article.topic}/${article.slug}`} className="group block">
        <article className="glass-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className={`relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br ${topic?.color || 'from-brand-500 to-brand-700'} overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[120px] opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">{topic?.icon}</span>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`topic-badge bg-black/40 backdrop-blur-md text-white`}>
                  {topic?.icon} {topic?.name}
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight group-hover:text-brand-400 transition-colors duration-300 mb-3">
                {article.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5 line-clamp-3">{article.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {dateStr}
                </time>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {article.readingTime} min
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (compact) {
    return (
      <Link href={`/${article.topic}/${article.slug}`} className="group block">
        <article className="flex gap-4 py-4 border-b border-white/5 last:border-0">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic?.color || 'from-brand-500 to-brand-700'} flex items-center justify-center shrink-0`}>
            <span className="text-2xl opacity-40">{topic?.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-200 group-hover:text-brand-400 transition-colors line-clamp-2 mb-1">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{dateStr}</span>
              <span>·</span>
              <span>{article.readingTime} min</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/${article.topic}/${article.slug}`} className="group block">
      <article className="glass-card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className={`relative aspect-[16/9] bg-gradient-to-br ${topic?.color || 'from-brand-500 to-brand-700'} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">{topic?.icon}</span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="topic-badge bg-black/40 backdrop-blur-md text-white text-[11px]">
              {topic?.icon} {topic?.name}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors duration-200 line-clamp-2 mb-2.5 leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 flex-1 leading-relaxed">{article.description}</p>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-gray-500">
            <time>{dateStr}</time>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>{article.readingTime} min de lecture</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
