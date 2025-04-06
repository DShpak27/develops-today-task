import { ERROR_MESSAGES } from "@/constants/error-messages";
import { BASE_URL } from "@/constants/api-constants";

interface Recipe {
    id: number;
    title: string;
    image: string;
}

interface RecipesResponse {
    results: Recipe[];
}

export interface SearchParams {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
}

export async function getRecipes(searchParams: SearchParams): Promise<RecipesResponse> {
    const { query, cuisine, maxReadyTime } = searchParams;

    if (!query && !cuisine && !maxReadyTime) {
        return { results: [] };
    }

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
    params.append("apiKey", process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "");

    const res = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error(ERROR_MESSAGES.RECIPES_LIST_FETCH_ERROR);
    }

    return res.json();
}
