# Falcon

A minimal shopping cart experience built using React, Redux and Webpack.

![Books Shopping](https://image.ibb.co/gg6pud/ezgif_com_video_to_gif_3.gif)

## Tech Stack

- Babel(ES6/ES7)
- React
- Redux
- React Router
- SCSS
- HMR

## Setup

```bash
# Install dependencies
yarn install

# Do a production build
yarn build

# Start the app at port 8080
yarn start

# Check "Scripts" for more options
```

## Assumptions

- 'Discounts' and 'Type Discounts' are applied over the original price of the book.
- 'Discounts' and 'Type Discounts' are applied n times equal to the quantity.
- In the cart page, the price container will stick to the bottom of the page when the user scroll to the end of the page. When he scrolls up again, the price container will stick to the bottom of the page until it reaches it original position.

![Stick to bottom](https://image.ibb.co/eYLhxy/ezgif_com_video_to_gif.gif)

Here, the price container sticks to the bottom as the scroll bar reaches the end of the page. The price container won't unstick as it won't be able to reach it's original position(Depends on the screen height).

![Stick to bottom](https://image.ibb.co/fWqCVJ/ezgif_com_video_to_gif_1.gif)

This is a more straight forward way. The price container sticks to the top on scroll and unsticks when it reaches its original position.

## Architecture & Implementation

- The app is built on top of React's unidirectional data flow
- The `booksList` and `cart` info are stored in Redux store
```javascript
const store = {
  booksList: [
    {
      id: 9090,
      name: 'Item1',
      price: 200,
      discount: 10,
      type: 'fiction',
      img_url: 'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    {
      id: 9091,
      name: 'Item2',
      price: 250,
      discount: 15,
      type: 'literature',
      img_url: 'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
    },
    ...
  ],
  cart: {
    9090: 5, // Item id as key and quantity as value
    9091: 1,
    ...
  }
}
```
- Only the `cart` info is saved to the localstorage. It is done using Redux's `store.subscribe()` method. Upon refresh, the app boots from the localstorage data.

- The app has two pages, `/books` and `/cart`. `booksList` and `cart` are shared among the pages.

- Updating quantity will modify `cart`. This makes it easy to update the quantity of a item.

- While displaying, keys of `cart` are mapped to ids of `booksList` to get additional info like name, price, discount and etc. To speed up this mapping, an one time indexing of `booksList` is done. This will convert the `booksList` to an object like below
```javascript
{
  9090: {
    id: 9090,
    name: 'Item1',
    price: 200,
    discount: 10,
    type: 'fiction',
    img_url: 'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
  },
  9091: {
    id: 9091,
    name: 'Item2',
    price: 250,
    discount: 15,
    type: 'literature',
    img_url: 'https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg'
  },
}
```
- Price computations are done using 4 compute methods. Can be found under `app/utils/compute.js`

- The app is completely responsive.

## Further Improvements

- Index `booksList` before saving it to the store

- When cart info is loaded from localstorage, check if the products in `cart` are available in `booksList`. If not, notify the user and clear the item from the cart. This ensures no unavailable products are added to the cart.

- Most unit tests for UI elements

## Scripts

**`yarn build`**

Build app for production

**`yarn start`**

Run app using `serve` (Production)

**`yarn start:dev`**

Run app using webpack dev server with HMR

**`yarn build:dev`**

Build app for development

**`yarn build:dev:watch`**

Build app for development in watch mode

**`yarn test`**

Run unit tests

**`yarn test:watch`**

Run unit tests in watch mode

**`yarn lint`**

Run `eslint` on app dir

**`yarn lint:fix`**

Run `eslint` and fix any linting errors


## License

Apache License, Version 2.0
