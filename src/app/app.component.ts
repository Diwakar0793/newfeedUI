import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NewsFeedComponent],
  template: `
    <div class="app-wrapper">
      <header class="app-header">
        <div class="header-content">
          <h1>📰 News Feed</h1>
          <p class="subtitle">Your Daily News Digest</p>
        </div>
      </header>
      <main class="app-container">
        <app-news-feed></app-news-feed>
      </main>
      <footer class="app-footer">
        <p>© {{currentYear}} News Feed. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f8f9fa;
    }

    .app-header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      padding: 2rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin: 0;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      margin: 0.5rem 0 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .app-container {
      flex: 1;
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .app-footer {
      background-color: #1e3c72;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .app-container {
        margin: 1rem auto;
      }
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();

  constructor() {}
}
