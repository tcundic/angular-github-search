import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng';

import { User, GithubSearchService } from '../../services/github-search-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private followersSubscription: Subscription;
  
  public followers: User[];
  public user: User;
  
  public cols: any[] = [
    { field: 'login', header: 'Username' },
    { field: 'html_url', header: 'View repository' }
  ];
  
  public tableSummary = 'Showing 1 to 10 entries';    

  constructor(
      private githubService: GithubSearchService,
      private route: ActivatedRoute) {
  }
  
  ngOnInit() {
      this.userSubscription = this.githubService.fetchUserProfile(this.route.snapshot.paramMap.get('username'))
        .subscribe((user: User) => {
          this.user = user;
        });
  }

  public loadDataLazy(event: LazyLoadEvent): void {
    const page = event.first / 10;
    const rows = event.rows;
    const username = this.route.snapshot.paramMap.get('username');
 
    setTimeout(() => {
      this.followersSubscription = this.githubService.getFollowers(username, page + 1, rows)
        .subscribe((followers: User[]) => this.followers = followers );
    });
  }

  public pageChange(event: any) {
    this.tableSummary = `Showing ${event.first + 1} to ${event.first + event.rows > this.user.followers ? this.user.followers : event.first + event.rows} of ${this.user.followers} entries`;
  }

  public isLoading(): boolean {
    return this.githubService.isLoading();
  }

  ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;

      this.followersSubscription.unsubscribe();
      this.followersSubscription = null;
  }
}
