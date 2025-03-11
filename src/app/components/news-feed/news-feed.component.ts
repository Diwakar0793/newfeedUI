import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsArticle, NewsResponse } from '../../models/news.interface';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsData: NewsResponse = {
    status: "success",
    timestamp: "2025-03-11T07:18:45.622Z",
    articleCount: 45,
    articles: [],
    sourcesScraped: ["Times of India", "The Hindu", "Hindustan Times"]
  };
  filteredArticles: NewsArticle[] = [];
  selectedSource: string = 'all';
  selectedTopic: string = 'all';

  private sourceColors: Record<string, string> = {
    'Times of India': '#ff4444',
    'The Hindu': '#4285f4',
    'Hindustan Times': '#00c851'
  };

  ngOnInit() {
    this.newsData = this.getMockData();
    this.filteredArticles = this.newsData.articles;
  }

  filterArticles() {
    this.filteredArticles = this.newsData.articles.filter(article => {
      const sourceMatch = this.selectedSource === 'all' || article.source === this.selectedSource;
      const topicMatch = this.selectedTopic === 'all' || article.topic === this.selectedTopic;
      return sourceMatch && topicMatch;
    });
  }

  getUniqueSources(): string[] {
    console.log("getUniqueSources",this.newsData.articles)
    return Array.from(new Set(this.newsData.articles.map(article => article.source)));
   
  }

  getUniqueTopics(): string[] {
    return Array.from(new Set(this.newsData.articles.map(article => article.topic)));
  }

  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  getSentimentColor(score: number): string {
    if (score > 0.2) return 'text-success';
    if (score < -0.2) return 'text-danger';
    return 'text-warning';
  }

  getSentimentIcon(score: number): string {
    if (score > 0.2) return 'fa-smile';
    if (score < -0.2) return 'fa-frown';
    return 'fa-meh';
  }

  getSourceColor(source: string): string {
    return this.sourceColors[source] || '#6c757d';
  }

  private getMockData(): NewsResponse {
    return {
      "status": "success",
      "timestamp": "2025-03-11T07:18:45.622Z",
      "articleCount": 45,
      "articles": [
        {
          "source": "Times of India",
          "title": "'A monetary transaction': Elon Musk's estranged trans daughter Vivian Wilson claims he used sex-selective IVF",
          "topic": "general",
          "summary": "'A monetary transaction': Elon Musk's estranged trans daughter Vivian Wilson claims he used sex-selective IVF Vivian Jenna Wilson, Elon Musk's estr...",
          "sentimentScore": 0.1,
          "affectedStates": [],
          "keyPeople": ["Elon Musk", "Vivian Wilson", "Vivian Jenna Wilson"],
          "organizations": [],
          "timestamp": "2025-03-11T11:56:02+05:30",
          "contentLength": 399,
          "url": "https://timesofindia.indiatimes.com/world/us/a-monetary-transaction-elon-musks-estranged-trans-daughter-vivian-wilson-claims-he-used-sex-selective-ivf/articleshow/118871928.cms",
          "category": [],
          "author": "TOI World Desk"
        },
        // ... Add all other articles from the JSON here ...
      ],
      "sourcesScraped": ["Times of India", "The Hindu", "Hindustan Times"]
    };
  }
} 