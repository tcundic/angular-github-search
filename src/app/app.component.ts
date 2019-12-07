import { Component } from '@angular/core';

import { User, GithubSearchService } from './services/github-search-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private githubService: GithubSearchService) {}

  public onDoSearch(searchTerm: string) {
    if (searchTerm === '') {
      this.githubService.removeSearchResults();
    } else {
      this.githubService.findUser(searchTerm);
    }
  }
}
