import { Component, OnInit, effect, inject, signal, untracked } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { ItemEntity } from '../../../core/entities/item.entity';
import { GetItemsUseCase } from '../../../core/use-cases/get-items.use-case';
import { SearchService } from '../../../../../shared/services/search.service';
import { LanguageService } from '../../../../../shared/services/language.service';

import { ItemListComponent } from '../../components/item-list/item-list.component';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MatPaginator, MatProgressSpinner, MatChipsModule, ItemListComponent],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  readonly snackBar = inject(SnackbarService);
  readonly getItemsUseCase = inject(GetItemsUseCase);
  readonly searchService = inject(SearchService);
  readonly langService = inject(LanguageService);

  readonly length = signal(0);
  readonly pageSize = signal(100);
  readonly pageIndex = signal(0);
  readonly isLoading = signal(true);
  readonly items = signal<ItemEntity[]>([]);

  constructor() {
    effect(() => {
      const q = this.searchService.query();
      const limit = untracked(() => this.pageSize());
      untracked(() => this.pageIndex.set(0));
      this.loadItems(0, limit, q);
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void { /* initial load handled by effect */ }

  handlePageEvent(e: PageEvent): void {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    this.loadItems(e.pageIndex * e.pageSize, e.pageSize, this.searchService.query());
  }

  private loadItems(skip: number, limit: number, search = ''): void {
    this.isLoading.set(true);
    this.getItemsUseCase.execute(skip, limit, search).subscribe({
      next: ({ items, total }: { items: ItemEntity[]; total: number }) => {
        this.items.set(items);
        this.length.set(total);
        this.isLoading.set(false);
        if (items.length > 0) {
          this.langService.initLangs(Object.keys(items[0].name));
        }
      },
      error: (err: Error) => this.snackBar.showError(err.message),
    });
  }
}
