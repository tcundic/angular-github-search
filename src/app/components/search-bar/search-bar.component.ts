import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private router: Router) {}

  @Output() doSearch = new EventEmitter<string>();

  public searchTerm: string;

  public onDoSearch() {
    this.doSearch.emit(this.searchTerm);
    this.router.navigate(['/']);
  }

  public onHomePageVisit() {
    this.searchTerm = '';
    this.doSearch.emit(this.searchTerm);
    this.router.navigate(['/']);
  }
}