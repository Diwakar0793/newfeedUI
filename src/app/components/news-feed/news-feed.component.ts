import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewsArticle, NewsResponse } from '../../models/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsData: NewsResponse = {
    status: "loading",
    timestamp: new Date().toISOString(),
    articleCount: 0,
    articles: [],
    sourcesScraped: []
  };
  filteredArticles: NewsArticle[] = [];
  selectedSource: string = 'all';
  selectedTopic: string = 'all';
  loading: boolean = true;
  error: string | null = null;
  sources: string[] = [];
  searchQuery: string = '';

  constructor(private newsService: NewsService) {
    this.sources = [];
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.error = null;
    
    if (this.selectedSource !== 'all') {
      this.newsService.getNewsBySource(this.selectedSource).subscribe({
        next: (response) => {
          this.handleNewsResponse(response);
        },
        error: (error) => this.handleError(error)
      });
    } else if (this.selectedTopic !== 'all') {
      this.newsService.getNewsByTopic(this.selectedTopic).subscribe({
        next: (response) => {
          this.handleNewsResponse(response);
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.newsService.getNews().subscribe({
        next: (response) => {
          this.handleNewsResponse(response);
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleNewsResponse(response: NewsResponse) {
    this.newsData = response;
    this.filteredArticles = this.newsData.articles;
    this.sources = this.newsData.sourcesScraped;
    this.loading = false;
    this.filterArticles();
  }

  private handleError(error: any) {
    console.error('Error fetching news:', error);
    this.error = 'Failed to load news. Please try again later.';
    this.loading = false;
  }

  filterArticles() {
    let filtered = this.newsData.articles;

    // Apply search filter
    if (this.searchQuery) {
      const search = this.searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(search) ||
        article.summary.toLowerCase().includes(search) ||
        article.author.toLowerCase().includes(search) ||
        article.topic.toLowerCase().includes(search)
      );
    }

    // Apply source filter
    if (this.selectedSource !== 'all') {
      filtered = filtered.filter(article => article.source === this.selectedSource);
    }

    // Apply topic filter
    if (this.selectedTopic !== 'all') {
      filtered = filtered.filter(article => article.topic === this.selectedTopic);
    }

    this.filteredArticles = filtered;
  }

  getUniqueSources(): string[] {
    console.log("newsData", this.newsData);
    // this.sources = this.newsData.sourcesScraped

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
    const colors: Record<string, string> = {
      'Times of India': '#ff4444',
      'The Hindu': '#4285f4',
      'Hindustan Times': '#00c851'
    };
    return colors[source] || '#6c757d';
  }
} 