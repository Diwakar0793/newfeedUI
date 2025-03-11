import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NewsResponse } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000'; // Your backend URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false // Set this to true if you need to send cookies
  };

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/analyze-news`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNewsBySource(source: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/news/source/${source}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNewsByTopic(topic: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}/news/topic/${topic}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
} 