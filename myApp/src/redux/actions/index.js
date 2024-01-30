export const setStepNum = (num) => ({
    type: 'SET_STEP_NUM',
    payload: num,
});
export const resetStepNum = () => ({
    type: 'RESET_STEP_NUM',
});
export const decrementStepNum = () => ({
    type: 'DECREMENT_STEP_NUM',
});
