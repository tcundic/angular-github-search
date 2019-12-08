import { Component, Input } from '@angular/core';

import { User } from '../../services/github-search-service';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent {
    @Input() item: User;
}