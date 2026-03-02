import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemEntity } from '../entities/item.entity';
import { ItemsRepository } from '../repositories/items.repository';

/**
 * Returns all items whose salvagesInto or recyclesInto contains the given ingredientId.
 */
@Injectable()
export class GetIngredientSourcesUseCase {
  private repository = inject(ItemsRepository);

  execute(ingredientId: string): Observable<ItemEntity[]> {
    return this.repository.getItemsByIngredient(ingredientId);
  }
}
