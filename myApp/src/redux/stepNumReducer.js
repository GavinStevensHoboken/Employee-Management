const initialState = {
    stepNum: 0,
};

const stepNumReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STEP_NUM':
            return {
                ...state,
                stepNum: action.payload,
            };
        case 'RESET_STEP_NUM':
            return {
                ...state,
                stepNum: 0,
            };
        case 'DECREMENT_STEP_NUM':
            return {
                ...state,
                stepNum: state.stepNum > 0 ? state.stepNum - 1 : 0,
            };
        default:
            return state;
    }
};

export default stepNumReducer;
