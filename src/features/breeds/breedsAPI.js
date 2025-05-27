const API_URL = 'https://api.thedogapi.com/v1';
export const fetchBreeds = async () => {
    try{
        const response = await fetch(`${API_URL}/breeds`);
        const data = await response.json();
        return data;

    } catch (error){
        console.error('Error fetching breeds:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}