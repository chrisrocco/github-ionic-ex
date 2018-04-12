import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

export interface GithubUser {
  avatar_url: string;
  login: string;
  url: string;
  score: string;
}

@Injectable()
export class GithubProvider {

  static api = 'https://api.github.com/search/users';

  constructor(public http: HttpClient) {
    console.log('Hello GithubProvider Provider');
  }

  searchUsers(query: string): Observable<GithubUser[]> {
    return this.http.get<any>(GithubProvider.api, {
      params: {
        q: query
      }
    }).map( data => data.items )
  }

}
