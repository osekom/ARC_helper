import { Injectable, inject, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly isDark = signal<boolean>(this.loadPreference());

  constructor() {
    effect(() => {
      this.apply(this.isDark());
      this.savePreference(this.isDark());
    });
  }

  toggle(): void {
    this.isDark.set(!this.isDark());
  }

  private apply(dark: boolean): void {
    if (dark) {
      this.doc.documentElement.classList.add('dark-theme');
    } else {
      this.doc.documentElement.classList.remove('dark-theme');
    }
  }

  private loadPreference(): boolean {
    try {
      const stored = localStorage.getItem('arc-theme');
      if (stored) return stored === 'dark';
    } catch {}
    return this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }

  private savePreference(dark: boolean): void {
    try {
      localStorage.setItem('arc-theme', dark ? 'dark' : 'light');
    } catch {}
  }
}
