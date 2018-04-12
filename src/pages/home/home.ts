import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GithubProvider, GithubUser} from "../../providers/github/github";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputStream$ = new Subject<string>();

  users$: Observable<GithubUser[]>;

  constructor(public navCtrl: NavController, public gs: GithubProvider) {
    this.users$ = this.inputStream$
                      .debounceTime(2000)
                      .distinctUntilChanged()
                      .filter( q => q.length >= 3)
                      .switchMap( q => gs.searchUsers(q) )
  }

  getItems(search) {
    console.log(search);
    this.inputStream$.next(search);
  }

}
