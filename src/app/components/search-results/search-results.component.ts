import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  public results: {}[] = [
    {
      "login": "githubstudent",
      "id": 1142544,
      "node_id": "MDQ6VXNlcjExNDI1NDQ=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/1142544?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/githubstudent",
      "html_url": "https://github.com/githubstudent",
      "followers_url": "https://api.github.com/users/githubstudent/followers",
      "following_url": "https://api.github.com/users/githubstudent/following{/other_user}",
      "gists_url": "https://api.github.com/users/githubstudent/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/githubstudent/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/githubstudent/subscriptions",
      "organizations_url": "https://api.github.com/users/githubstudent/orgs",
      "repos_url": "https://api.github.com/users/githubstudent/repos",
      "events_url": "https://api.github.com/users/githubstudent/events{/privacy}",
      "received_events_url": "https://api.github.com/users/githubstudent/received_events",
      "type": "User",
      "site_admin": false,
      "score": 65.244736
    },
  ];
}