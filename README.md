# ARC Helper

> A companion tool for **ARC Raiders** players to plan crafting sessions and make the most out of their stash.

## What is this?

When you want to craft an item in ARC Raiders, you need to know:

1. **What ingredients are required** to craft it
2. **Which items in your stash you can salvage or recycle** to obtain those ingredients

ARC Helper answers both questions in one place. Look up any item, see its full crafting recipe with ingredient quantities, and instantly find out which items you can break down to get what you need — without having to cross-reference the wiki manually.

## Features

- Full item browser with search and language support
- Crafting recipe viewer with ingredient cards
- Ingredient source finder — shows which items salvage/recycle into each ingredient
- Vendor prices, compatible mods, repair costs, and spawn locations
- Dark / Light theme

## Data source

Item data is sourced from **[RaidTheory/arcraiders-data](https://github.com/RaidTheory/arcraiders-data)**.  
Individual JSON files live in `public/data/` and are merged at build time into a single `items.json`.

To add or update items, edit the corresponding `public/data/<id>.json` and rebuild.

## Development

This project was built with **~90% GitHub Copilot** assistance and ~10% manual intervention.  
Stack: Angular 18 · Angular Material 3 · SCSS · Docker · nginx

## Running

```bash
docker compose up -d --build
```

Open **http://localhost:8080** — stop with `docker compose down`.

## Local development

```bash
npm install
npm start   # http://localhost:4200
```

> Run `node scripts/generate-data-index.mjs` once if `public/data/items.json` does not exist yet.