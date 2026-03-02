import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly selectedLang = signal<string>('en');
  readonly availableLangs = signal<string[]>([]);

  setLang(lang: string): void {
    this.selectedLang.set(lang);
  }

  /** Called once when items are loaded to populate the available langs. */
  initLangs(langs: string[]): void {
    if (this.availableLangs().length === 0) {
      this.availableLangs.set(langs);
      // Keep selected lang if already in the list, otherwise default to 'en'
      if (!langs.includes(this.selectedLang())) {
        this.selectedLang.set(langs.includes('en') ? 'en' : langs[0]);
      }
    }
  }

  getLabel(map: { [lang: string]: string }): string {
    const lang = this.selectedLang();
    return map[lang] ?? map['en'] ?? Object.values(map)[0] ?? '';
  }
}
