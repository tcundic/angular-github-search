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
                public public_repos: number,
                public date_joined: Date) {}
}

@Injectable()
export class GithubSearchService {
    private GITHUB_API = 'https://api.github.com';
    private SEARCH_USERS_API = 'search/users?per_page=10&q=';
    private SINGLE_USER_API = 'users';
    private FOLLOWERS_API = 'followers';
    
    private searchResults: BehaviorSubject<User[]> = new BehaviorSubject([]);
    private userProfile: BehaviorSubject<User> = new BehaviorSubject(null);
    private userFollowers: BehaviorSubject<User[]> = new BehaviorSubject([]);

    private loading: boolean = false;

  constructor(private http: HttpClient) {}

  public findUser(keyword: string): BehaviorSubject<User[]> {
      this.loading = true;
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
                    item.public_repos,
                    item.created_at
                );
            });
        })).subscribe((users: User[]) => {
            this.loading = false;
            this.searchResults.next(users);
        },
        (error: any) => {
            console.warn('Error while getting search results: ', error);
            this.loading = false;
            this.searchResults.next([]);
        });
        return this.searchResults;
  }

  public getSearchResults(): BehaviorSubject<User[]> {
      return this.searchResults;
  }

  public removeSearchResults(): void {
      this.searchResults.next([]);
  }
  
  public fetchUserProfile(username: string): BehaviorSubject<User> {
    this.userProfile.next(null);
    this.loading = true;

    const apiUrl = `${this.GITHUB_API}/${this.SINGLE_USER_API}/${username}`;
    this.http.get(apiUrl).subscribe((res: any) => {
        let user = new User(
            res.login,
            res.avatar_url,
            res.name,
            res.email,
            res.bio,
            res.html_url,
            res.followers,
            res.following,
            res.public_repos,
            res.created_at
        );

        this.loading = false;
        this.userProfile.next(user);
    },
    (error: any) => {
        console.warn('Error during fetching user profile: ', error);
        this.loading = false;
        this.userProfile.next(null);
    });
    
    return this.userProfile;
  }

  public isLoading(): boolean {
      return this.loading;
  }

  public getFollowers(user: string, page: number, numberOfRows: number): BehaviorSubject<User[]> {
    this.loading = true;
    const apiUrl = `${this.GITHUB_API}/${this.SINGLE_USER_API}/${user}/${this.FOLLOWERS_API}?per_page=${numberOfRows}&page=${page}`;
    this.http.get(apiUrl)
    .pipe(map((res: any) => {
          return res.map((item: any) => {
              return new User(
                  item.login,
                  item.avatar_url,
                  item.name,
                  item.email,
                  item.bio,
                  item.html_url,
                  item.followers,
                  item.following,
                  item.public_repos,
                  item.created_at
              );
          });
      })).subscribe((users: User[]) => {
          this.loading = false;
          this.userFollowers.next(users);
      },
      (error: any) => {
          console.warn('Error while getting search results: ', error);
          this.loading = false;
          this.userFollowers.next([]);
      });
      return this.userFollowers;
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