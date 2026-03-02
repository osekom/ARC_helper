import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDto } from '../models/item.dto';

/**
 * Loads all items from a single consolidated /data/items.json file.
 * Uses an absolute URL to bypass the baseUrlInterceptor.
 * The file is generated at build time by: node scripts/generate-data-index.mjs
 */
@Injectable()
export class LocalItemsDataSource {
  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemDto[]> {
    const url = `${window.location.origin}/data/items.json`;
    return this.http.get<ItemDto[]>(url);
  }
}
