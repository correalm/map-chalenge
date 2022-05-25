export default function removePin(state, id) {
  const newState = state.filter((i) => i.id !== id);
  return newState;
}
