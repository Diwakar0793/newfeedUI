import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NewsResponse } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newfeed-api.vercel.app'; // Your backend URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/analyze-news`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNewsBySource(source: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/analyze-news?source=${source}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNewsByTopic(topic: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/analyze-news?topic=${topic}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
} 