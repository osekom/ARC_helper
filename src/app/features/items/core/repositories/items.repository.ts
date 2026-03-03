import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ItemEntity } from '../entities/item.entity';

export interface ItemsPage {
  items: ItemEntity[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export abstract class ItemsRepository {
  abstract getItems(skip: number, limit: number, search?: string, rarity?: string): Observable<ItemsPage>;
  abstract getItem(id: string): Observable<ItemEntity | undefined>;
  abstract getItemsByIngredient(ingredientId: string): Observable<ItemEntity[]>;
}
