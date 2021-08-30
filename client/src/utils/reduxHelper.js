

export const createSetValueAction = (type) => {
    return (key, value) => ({ type, key, value });
};

export const setValueReducer = (state, action) => {
    state[action.key] = action.value;
}