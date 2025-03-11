import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="news-container">
      <div class="news-grid">
        @for (article of news; track article.url) {
          <div class="news-card">
            @if (article.urlToImage) {
              <img [src]="article.urlToImage" [alt]="article.title" class="news-image">
            }
            <div class="news-content">
              <h3>{{ article.title }}</h3>
              <p class="source">{{ article.source.name }}</p>
              <p class="description">{{ article.description }}</p>
              <a [href]="article.url" target="_blank" class="read-more">Read More</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .news-container {
      padding: 1rem;
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .news-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s ease;
    }
    .news-card:hover {
      transform: translateY(-4px);
    }
    .news-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .news-content {
      padding: 1rem;
    }
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #333;
    }
    .source {
      color: #007bff;
      font-size: 0.9rem;
      margin: 0 0 0.5rem;
    }
    .description {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 1rem;
      line-height: 1.4;
    }
    .read-more {
      display: inline-block;
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
    }
    .read-more:hover {
      text-decoration: underline;
    }
  `]
})
export class NewsComponent implements OnInit {
  news: NewsItem[] = [];

  constructor() {}

  ngOnInit() {}

  // Add your method to fetch news data
  updateNews(news: NewsItem[]) {
    this.news = news;
  }
} 