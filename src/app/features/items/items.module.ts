import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { LocalItemsDataSource } from './data/data-sources/local-items.data-source';
import { ItemsRepository } from './core/repositories/items.repository';
import { ItemsRepositoryImpl } from './data/repositories/items.repository-impl';
import { GetItemsUseCase } from './core/use-cases/get-items.use-case';
import { GetItemUseCase } from './core/use-cases/get-item.use-case';
import { GetIngredientSourcesUseCase } from './core/use-cases/get-ingredient-sources.use-case';

@NgModule({
  declarations: [],
  imports: [CommonModule, ItemsRoutingModule],
  providers: [
    LocalItemsDataSource,
    { provide: ItemsRepository, useClass: ItemsRepositoryImpl },
    GetItemsUseCase,
    GetItemUseCase,
    GetIngredientSourcesUseCase,
  ],
})
export class ItemsModule {}
