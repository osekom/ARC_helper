export interface ItemLocalizedTextDto {
  [lang: string]: string;
}

export interface ItemRecipeDto {
  [resource: string]: number;
}

export interface ItemVendorDto {
  cost: { [currency: string]: number };
  trader: string;
}

export interface ItemDto {
  id: string;
  name: ItemLocalizedTextDto;
  description: ItemLocalizedTextDto;
  type: string;
  rarity: string;
  value: number;
  weightKg: number;
  stackSize: number;
  foundIn?: string;
  compatibleWith?: string[];
  recyclesInto?: ItemRecipeDto;
  salvagesInto?: ItemRecipeDto;
  repairCost?: ItemRecipeDto;
  repairDurability?: number;
  recipe?: ItemRecipeDto;
  craftBench?: string | string[];
  stationLevelRequired?: number;
  vendors?: ItemVendorDto[];
  effects?: { [key: string]: { value: string; [lang: string]: string } };
  imageFilename: string;
  updatedAt: string;
  addedIn: string;
}
