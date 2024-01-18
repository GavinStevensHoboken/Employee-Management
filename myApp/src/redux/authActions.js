export const logIn = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const jwtCookie = cookies.find(row => row.startsWith('token='));
    const token = jwtCookie ? jwtCookie.split('=')[1] : null;
    console.log(token);
    return {
        type: 'LOG_IN',
        payload: token
    };
};

export const logOut = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    return {
        type: 'LOG_OUT'
    };
};