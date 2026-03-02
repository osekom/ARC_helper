import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDto } from '../models/item.dto';

/**
 * Loads all items from a single consolidated data/items.json file.
 * Uses document.baseURI so the path works both locally and on GitHub Pages sub-paths.
 * The file is generated at build time by: node scripts/generate-data-index.mjs
 */
@Injectable()
export class LocalItemsDataSource {
  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemDto[]> {
    const url = `${document.baseURI}data/items.json`;
    return this.http.get<ItemDto[]>(url);
  }
}
