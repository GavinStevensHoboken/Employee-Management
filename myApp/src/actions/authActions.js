export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const login = (credentials) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const user = await response.json();
            dispatch(loginSuccess(user));
        } else {
        }
    };
};
