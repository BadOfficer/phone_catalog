# Nice Gadgets

Nice Gadgets is a modern phone catalog web application built with React and TypeScript. Users can browse and search phones by category, sort and filter products, view detailed specifications, add items to the cart or favourites, and switch between light and dark themes.

## Live DEMO

Experience the live website:
[Nice Gadgets](https://BadOfficer.github.io/phone_catalog/)

## Design reference

This project is based on the following Figma design:
[FIGMA](https://www.figma.com/design/7JTa0q8n3dTSAyMNaA0u8o/Phone-catalog--V2--Rounded-Style-3?node-id=15875-36589&t=56UbP7s95nbHFQWI-0)

## Technologies used

### Core

- React (v18.2.0)
- TypeScript
- SCSS

### State Management

- Redux Toolkit - Cart and Favourites state;
- React Context - Theme switching;

### UI/UX

- React Router - Navigation;
- Embla Carousel - Sliders;

### Data Fetching

- RTK Query - For all fetches

### Development

- Vite - Build tool

## Getting Started

1. Clone the repository:

```
git clone https://github.com/BadOfficer/phone_catalog.git

cd phone_catalog
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Run the project locally:

```
npm start
# or
yarn start
```

## Features

- <b>Product Catalog</b>: Browse phones by category with key specs.
- <b>Sorting</b>: Sort by newest, name, or price.
- <b>Pagination</b>: Navigate large product lists by pages.
- <b>Search</b>: Find products by name quickly.
- <b>Sliders</b>: Responsive carousels for images and featured items.
- <b>Routing and Navigation</b>: React Router with breadcrumbs.
- <b>Responsive Design</b>: Mobile-first layout for all screens.
- <b>Persistence</b>: Cart and favourites saved in localStorage.
- <b>Shopping Cart</b>: Add, remove, and update products with total price.
- <b>Theme switching</b>: Toggle light/dark themes with React Context.
