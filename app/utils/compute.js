export const computeTotal = (cart, indexedBooks) => Object.keys(cart)
  .reduce(
    (value, key) => value + (cart[key] * indexedBooks[key].price),
    0,
  )

export const computeDiscount = (cart, indexedBooks) => Object.keys(cart)
  .reduce(
    (value, key) =>
      value + (cart[key] * ((indexedBooks[key].price * indexedBooks[key].discount) / 100)),
    0,
  )

export const computeTypeDiscount = (cart, indexedBooks, allowedTypes) => Object.keys(cart)
  .filter(key => allowedTypes.includes(indexedBooks[key].type))
  .reduce(
    (value, key) => value + (cart[key] * ((indexedBooks[key].price * 15) / 100)),
    0,
  )

export const computeCount = cart => Object.keys(cart)
  .reduce(
    (value, key) => cart[key] + value,
    0,
  )
