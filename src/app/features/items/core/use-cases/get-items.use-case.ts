import { Injectable, inject } from '@angular/core';
import { ItemsRepository } from '../repositories/items.repository';

@Injectable({ providedIn: 'root' })
export class GetItemsUseCase {
  private repo = inject(ItemsRepository);

  execute(skip: number, limit: number, search = '') {
    return this.repo.getItems(skip, limit, search);
  }
}
