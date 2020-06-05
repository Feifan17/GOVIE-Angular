import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { result } from '../models/result.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiKey: string = "b9bb3cc2";
  private url: string = "http://www.omdbapi.com/?";
  private searchResults: result[] = [];
  private totalResults: number = 0;
  private hasResults: boolean = false;
  private searchResultsSubject = new Subject<any>(); 

  constructor(private http: HttpClient) { }

  getMovies(title: string): void {
    this.http.get<any>(this.url + `apiKey=${this.apiKey}` + `&s=${title}`).subscribe(res => {
      if(res.Response === "False") {
        console.log(res.Error);
      }
      else {
        console.log(res);
        this.hasResults = true;
        this.searchResults = res.Search;
        this.totalResults = res.totalResults;
        this.searchResultsSubject.next({hasResults: this.hasResults, searchResults: this.searchResults, totalResults: this.totalResults });
      } 
    });
  }

  getSearchResultObs(): Observable<any> {
    return this.searchResultsSubject.asObservable();
  }

}
