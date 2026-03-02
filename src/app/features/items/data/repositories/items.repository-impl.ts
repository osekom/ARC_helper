import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import { ItemEntity } from '../../core/entities/item.entity';
import { ItemDto } from '../models/item.dto';
import { ItemsPage, ItemsRepository } from '../../core/repositories/items.repository';
import { ItemMapper } from '../mappers/item.mapper';
import { LocalItemsDataSource } from '../data-sources/local-items.data-source';

@Injectable()
export class ItemsRepositoryImpl implements ItemsRepository {
  /** Single shared observable that loads and caches all items once. */
  private cache$: Observable<ItemEntity[]> | null = null;

  constructor(private dataSource: LocalItemsDataSource) {}

  private loadAll(): Observable<ItemEntity[]> {
    if (!this.cache$) {
      this.cache$ = this.dataSource.getItems().pipe(
        map((dtos: ItemDto[]) => dtos.map(ItemMapper.toEntity)),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  getItems(skip: number, limit: number, search = ''): Observable<ItemsPage> {
    return this.loadAll().pipe(
      map((items: ItemEntity[]) => {
        const filtered = search
          ? items.filter((item: ItemEntity) => {
              const q = search.toLowerCase();
              return (
                item.id.includes(q) ||
                Object.values(item.name).some((v: string) => v.toLowerCase().includes(q)) ||
                (item.type ?? '').toLowerCase().includes(q) ||
                (item.rarity ?? '').toLowerCase().includes(q)
              );
            })
          : items;
        return {
          items: filtered.slice(skip, skip + limit),
          total: filtered.length,
        };
      })
    );
  }

  getItem(id: string): Observable<ItemEntity | undefined> {
    return this.loadAll().pipe(
      map((items: ItemEntity[]) => items.find((item: ItemEntity) => item.id === id))
    );
  }

  getItemsByIngredient(ingredientId: string): Observable<ItemEntity[]> {
    return this.loadAll().pipe(
      map((items: ItemEntity[]) =>
        items.filter(
          (item: ItemEntity) =>
            (item.salvagesInto && ingredientId in item.salvagesInto) ||
            (item.recyclesInto && ingredientId in item.recyclesInto)
        )
      )
    );
  }
}
