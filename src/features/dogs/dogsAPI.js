const API_URL ='https://api.thedogapi.com/v1';
const LIMIT = 10;
export const fetchDogImagesByBreed = async(breedID) => {
    try {
        const response = await fetch(`${API_URL}/images/search?limit=${LIMIT}&breed_ids=${breedID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dog images by breed:', error);
        throw error;
    }
};
export const fetchRandomDogImages = async () => {
    try {
        const response = await fetch(`${API_URL}/images/search?limit=${LIMIT}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching random dog images:', error);
        throw error;
    }
};