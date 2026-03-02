import { ItemEntity } from '../../core/entities/item.entity';
import { ItemDto } from '../models/item.dto';

export class ItemMapper {
  static toEntity(dto: ItemDto): ItemEntity {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      type: dto.type,
      rarity: dto.rarity,
      value: dto.value,
      weightKg: dto.weightKg,
      stackSize: dto.stackSize,
      foundIn: dto.foundIn,
      compatibleWith: dto.compatibleWith,
      recyclesInto: dto.recyclesInto,
      salvagesInto: dto.salvagesInto,
      repairCost: dto.repairCost,
      repairDurability: dto.repairDurability,
      recipe: dto.recipe,
      craftBench: dto.craftBench
        ? Array.isArray(dto.craftBench) ? dto.craftBench : [dto.craftBench]
        : undefined,
      stationLevelRequired: dto.stationLevelRequired,
      vendors: dto.vendors,
      effects: dto.effects,
      imageFilename: dto.imageFilename,
      updatedAt: dto.updatedAt,
      addedIn: dto.addedIn,
    };
  }
}
