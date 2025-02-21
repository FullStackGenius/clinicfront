export function checkUserLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Safely retrieve the token
    return token !== undefined && token !== null; // Return true if the token exists
}