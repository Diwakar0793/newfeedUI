export interface NewsArticle {
  source: string;
  title: string;
  topic: string;
  summary: string;
  sentimentScore: number;
  affectedStates: string[];
  keyPeople: string[];
  organizations: string[];
  timestamp: string;
  contentLength: number;
  url: string;
  category: string[];
  author: string;
}

export interface NewsResponse {
  status: string;
  timestamp: string;
  articleCount: number;
  articles: NewsArticle[];
  sourcesScraped: string[];
} 