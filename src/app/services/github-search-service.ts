import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Subject, Observable, BehaviorSubject } from 'rxjs';

export class User {
    constructor(public login: string,
                public avatar_url: string,
                public name: string,
                public email: string,
                public bio: string,
                public html_url: string,
                public followers: number,
                public following: number,
                public public_repos: number) {}
}

@Injectable()
export class GithubSearchService {
    private GITHUB_API = 'https://api.github.com';
    private SEARCH_USERS_API = 'search/users?per_page=10&q=';
    private SINGLE_USER_API = 'users';
    
    private searchResults: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  public findUser(keyword: string): BehaviorSubject<User[]> {
      const apiUrl = `${this.GITHUB_API}/${this.SEARCH_USERS_API}${keyword}`;
      this.http.get(apiUrl)
      .pipe(map((res: any) => {
            return res.items.map((item: any) => {
                return new User(
                    item.login,
                    item.avatar_url,
                    item.name,
                    item.email,
                    item.bio,
                    item.html_url,
                    item.followers,
                    item.following,
                    item.public_repos
                );
            });
        })).subscribe((users: User[]) => {
            this.searchResults.next(users);
        });
        return this.searchResults;
  }

  public getSearchResults(): BehaviorSubject<User[]> {
      return this.searchResults;
  }

  public removeSearchResults(): void {
      console.log('OK');
      this.searchResults.next([]);
  }
}



// const GithubService = {

//     getUser: async function(userId) {
//         try {
//             const data = await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}`);
//             return data;
//         } catch(error) {
//             console.error('Error while fetching user: ', error);
//             return null;
//         }
//     },

//     getUserRepositories: async function(userId) {
//         try {
//             return getRepositoriesNextPage(userId, 1, []);
//         } catch(error) {
//             console.error('Error while fetching users: ', error);
//             return null;
//         }
//     },
// }

// async function getRepositoriesNextPage(userId, pageNumber, repositoriesList) {
//     return await axios.get(`${GITHUB_API}/${SINGLE_USER_API}/${userId}/${USER_REPOSITORIES_API}${pageNumber}`).then((response) => {
//         if (response.data.length != 0) {
//             return getRepositoriesNextPage(userId, ++pageNumber, repositoriesList.concat(response.data));
//         } else {
//             return repositoriesList;
//         }
//     });
// }

// export default GithubService;