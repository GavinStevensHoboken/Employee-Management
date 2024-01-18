export const logIn = () => {
    return {
        type: 'LOG_IN',
    };
};

export const logOut = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    return {
        type: 'LOG_OUT'
    };
};