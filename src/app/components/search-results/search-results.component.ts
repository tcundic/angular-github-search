import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { User, GithubSearchService } from '../../services/github-search-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements AfterViewInit, OnDestroy {
  public results: User[];
  public userSubscription: Subscription;

  constructor(private githubService: GithubSearchService) {
  }
  
  ngAfterViewInit() {   
    setTimeout(() => {
      this.userSubscription = this.githubService.getSearchResults().subscribe(users => {
        this.results = users;
      });
    });   
  }

  public isLoading(): boolean {
    return this.githubService.isLoading();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.userSubscription = null;
  }
}