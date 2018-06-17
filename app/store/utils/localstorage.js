export const read = () => {
  try {
    const localState = localStorage.getItem('store')
    if (localState === null) return undefined
    return JSON.parse(localState)
  } catch (e) {
    return undefined
  }
}

export const save = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('store', serializedState)
  } catch (e) {
    console.error('Something went wrong with the localstorage!')
  }
  return undefined
}
