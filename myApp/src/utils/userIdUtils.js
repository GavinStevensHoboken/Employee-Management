import { getJwtToken } from "./jwtTokenUtils";

export async function fetchUserRole() {
    const token = getJwtToken();
    try {
        const response = await fetch('http://localhost:3001/api/users/getUserRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const role = data.role
        return role

    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw new Error(`Server error!`);
    }
}