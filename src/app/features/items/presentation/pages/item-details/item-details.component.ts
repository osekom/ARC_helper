import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ItemEntity, ItemVendor } from '../../../core/entities/item.entity';
import { GetItemUseCase } from '../../../core/use-cases/get-item.use-case';
import { GetIngredientSourcesUseCase } from '../../../core/use-cases/get-ingredient-sources.use-case';
import { LanguageService } from '../../../../../shared/services/language.service';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';

export interface RecipeRow {
  ingredient: string;
  qty: number;
  ingredientItem?: ItemEntity;
  sources: ItemEntity[];
}

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    MatButtonModule, MatIconModule, MatProgressSpinner,
    MatChipsModule, MatDividerModule, MatTooltipModule, RouterLink,
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly snackBar = inject(SnackbarService);
  readonly getItemUseCase = inject(GetItemUseCase);
  readonly getIngredientSourcesUseCase = inject(GetIngredientSourcesUseCase);
  readonly langService = inject(LanguageService);

  readonly isLoading = signal(true);
  readonly item = signal<ItemEntity | null>(null);
  readonly recipeRows = signal<RecipeRow[]>([]);
  readonly resourceItems = signal<{ [id: string]: ItemEntity | undefined }>({});

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getItemUseCase.execute(id).subscribe({
      next: (item: ItemEntity | undefined) => {
        if (item) {
          this.item.set(item);
          this.langService.initLangs(Object.keys(item.name));
          this.loadRecipeSources(item);
          this.loadResourceItems(item);
        }
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.snackBar.showError(err.message);
        this.isLoading.set(false);
      },
    });
  }

  private loadRecipeSources(item: ItemEntity): void {
    if (!item.recipe) return;
    const ingredients = Object.entries(item.recipe);
    if (!ingredients.length) return;

    const pairs$ = ingredients.map(([id]) =>
      forkJoin([
        this.getItemUseCase.execute(id),
        this.getIngredientSourcesUseCase.execute(id),
      ] as const)
    );

    forkJoin(pairs$).subscribe((results: [ItemEntity | undefined, ItemEntity[]][]) => {
      this.recipeRows.set(
        ingredients.map(([ingredient, qty], i) => ({
          ingredient,
          qty,
          ingredientItem: results[i][0] ?? undefined,
          sources: results[i][1],
        }))
      );
    });
  }

  private loadResourceItems(item: ItemEntity): void {
    const ids = new Set<string>([
      ...(item.compatibleWith ?? []),
      ...Object.keys(item.recyclesInto ?? {}),
      ...Object.keys(item.salvagesInto ?? {}),
      ...Object.keys(item.repairCost ?? {}),
    ]);
    if (!ids.size) return;

    forkJoin(
      [...ids].map((id) => this.getItemUseCase.execute(id))
    ).subscribe((entities: (ItemEntity | undefined)[]) => {
      const map: { [id: string]: ItemEntity | undefined } = {};
      [...ids].forEach((id, i) => (map[id] = entities[i]));
      this.resourceItems.set(map);
    });
  }

  getLabel(map: { [lang: string]: string }): string {
    return this.langService.getLabel(map);
  }

  resourceEntries(obj: { [key: string]: number } | undefined): [string, number][] {
    return obj ? Object.entries(obj) : [];
  }

  vendorCostStr(vendor: ItemVendor): string {
    return Object.entries(vendor.cost)
      .map(([currency, amount]) => `${amount} ${currency}`)
      .join(' + ');
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }
}

