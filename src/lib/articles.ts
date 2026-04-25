import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
  tags: string[];
  image: string;
  author: string;
  readingTime: number;
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];
  
  const articles: Article[] = [];
  const topics = fs.readdirSync(articlesDir);
  
  for (const topic of topics) {
    const topicDir = path.join(articlesDir, topic);
    if (!fs.statSync(topicDir).isDirectory()) continue;
    
    const files = fs.readdirSync(topicDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(topicDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      
      articles.push({
        slug: file.replace('.md', ''),
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        topic: data.topic || topic,
        tags: data.tags || [],
        image: data.image || '',
        author: data.author || 'DailyTrend',
        readingTime: data.readingTime || Math.ceil(content.split(' ').length / 200),
        content,
      });
    }
  }
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticlesByTopic(topicSlug: string): Article[] {
  return getAllArticles().filter(a => a.topic === topicSlug);
}

export function getArticle(topicSlug: string, articleSlug: string): Article | null {
  const filePath = path.join(articlesDir, topicSlug, `${articleSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  
  return {
    slug: articleSlug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    topic: data.topic || topicSlug,
    tags: data.tags || [],
    image: data.image || '',
    author: data.author || 'DailyTrend',
    readingTime: data.readingTime || Math.ceil(content.split(' ').length / 200),
    content,
  };
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter(a => a.slug !== article.slug)
    .filter(a => a.topic === article.topic || a.tags.some(t => article.tags.includes(t)))
    .slice(0, limit);
}
