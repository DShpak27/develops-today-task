import { ERROR_MESSAGES } from "@/constants/error-messages";
import { BASE_URL } from "@/constants/api-constants";

interface Ingredient {
    id: number;
    original: string;
}

interface RecipeDetails {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: Ingredient[];
    summary: string;
}

export async function getRecipeDetails(id: string): Promise<RecipeDetails> {
    const res = await fetch(`${BASE_URL}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(ERROR_MESSAGES.RECIPE_DETAILS_FETCH_ERROR);
    }

    return res.json();
}
