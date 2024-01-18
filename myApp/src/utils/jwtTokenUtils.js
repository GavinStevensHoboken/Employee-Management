export const getJwtToken = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const jwtCookie = cookies.find(row => row.startsWith('token='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
};