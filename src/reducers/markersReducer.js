import removePin from "../utilites/removePin";

// CONFIG REDUCER
export const markersReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE-ALL":
      return [];
    case "REMOVE-PIN":
      return (state = removePin(state, action.payload));
    case "MODIFY-POSITION":
      const newState = state.map((pin) => {
        if (pin.id === action.payload.id) {
          const newPin = {
            coordinates: {
              lat: action.payload.lat,
              lng: action.payload.lng,
            },
            timestamp: action.payload.id,
            id: action.payload.id,
          };
          return newPin;
        } else {
          return pin;
        }
      });
      return (state = newState);

    default:
      return state;
  }
};
