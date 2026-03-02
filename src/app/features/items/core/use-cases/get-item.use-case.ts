import { Injectable, inject } from '@angular/core';
import { ItemsRepository } from '../repositories/items.repository';

@Injectable({ providedIn: 'root' })
export class GetItemUseCase {
  private repo = inject(ItemsRepository);

  execute(id: string) {
    return this.repo.getItem(id);
  }
}
