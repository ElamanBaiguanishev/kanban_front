export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token');

    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Error parsing token from local storage:', error);
        }
    }
    
    return '';
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
}

export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
