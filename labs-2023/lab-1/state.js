export function createState(initialState) {
  let state = initialState;

  return [() => state, newState => state = newState];
}