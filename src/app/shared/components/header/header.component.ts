import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchService } from '../../services/search.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly searchService = inject(SearchService);
  readonly themeService = inject(ThemeService);

  onSearch(event: Event): void {
    this.searchService.setQuery((event.target as HTMLInputElement).value);
  }
}
