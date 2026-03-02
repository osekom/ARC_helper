import { Component, inject, input } from '@angular/core';
import { ItemEntity } from '../../../core/entities/item.entity';
import { LanguageService } from '../../../../../shared/services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  items = input<ItemEntity[]>();
  readonly langService = inject(LanguageService);

  getName(item: ItemEntity): string {
    return this.langService.getLabel(item.name);
  }
}
