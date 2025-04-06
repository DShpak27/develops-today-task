import Image from "next/image";
import Link from "next/link";

interface Recipe {
    id: number;
    title: string;
    image: string;
}

interface RecipesResponse {
    results: Recipe[];
}

interface SearchParams {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
}

async function getRecipes(searchParams: SearchParams): Promise<RecipesResponse> {
    const { query, cuisine, maxReadyTime } = searchParams;

    if (!query && !cuisine && !maxReadyTime) {
        return { results: [] };
    }

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
    params.append("apiKey", process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "");

    const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
        { next: { revalidate: 60 } }, // Cache for 1 minute
    );

    if (!res.ok) {
        throw new Error("Failed to fetch recipes");
    }

    return res.json();
}

export default async function RecipesList({ searchParams }: { searchParams: SearchParams }) {
    try {
        const data = await getRecipes(searchParams);

        if (!data.results || data.results.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">No recipes found. Try different search criteria.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.results.map(recipe => (
                    <Link
                        href={`/recipes/${recipe.id}`}
                        key={recipe.id}
                        className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold line-clamp-2">{recipe.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-600">Error loading recipes. Please try again later.</p>
            </div>
        );
    }
}
