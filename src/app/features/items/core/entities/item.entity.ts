export interface ItemLocalizedText {
  [lang: string]: string;
}

export interface ItemRecipe {
  [resource: string]: number;
}

export interface ItemVendor {
  cost: { [currency: string]: number };
  trader: string;
}

export interface ItemEffect {
  value: string;
  [lang: string]: string;
}

export interface ItemEntity {
  id: string;
  name: ItemLocalizedText;
  description: ItemLocalizedText;
  type: string;
  rarity: string;
  value: number;
  weightKg: number;
  stackSize: number;
  foundIn?: string;
  compatibleWith?: string[];
  recyclesInto?: ItemRecipe;
  salvagesInto?: ItemRecipe;
  repairCost?: ItemRecipe;
  repairDurability?: number;
  recipe?: ItemRecipe;
  craftBench?: string[];
  stationLevelRequired?: number;
  vendors?: ItemVendor[];
  effects?: { [key: string]: ItemEffect };
  imageFilename: string;
  updatedAt: string;
  addedIn: string;
}
