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
    this.githubService.removeSearchResults();

    if (searchTerm !== '') {
      this.githubService.findUser(searchTerm);
    }
  }
}
