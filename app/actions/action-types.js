const actionTypes = [
  'ADD_TO_CART',
  'BOOKS_LIST',
]

export default actionTypes.reduce((obj, str) => {
  const mirror = {
    [str]: str,
  }
  return { ...obj, ...mirror }
}, {})
