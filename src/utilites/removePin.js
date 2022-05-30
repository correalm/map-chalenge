export default function removePin(state, id) {
  const newState = state.filter((pin) => pin.id !== id);
  return newState;
}
