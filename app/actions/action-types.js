const actionTypes = [
  'ADD_TO_CART',
  'SAMPLE',
]

export default actionTypes.reduce((obj, str) => {
  const mirror = {
    [str]: str,
  }
  return { ...obj, ...mirror }
}, {})
