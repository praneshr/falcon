export default (state, payload, key) => {
  const newState = {}
  newState[key] = payload
  return { ...state, ...newState }
}
