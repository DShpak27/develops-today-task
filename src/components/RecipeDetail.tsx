import Image from "next/image";

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

async function getRecipeDetails(id: string): Promise<RecipeDetails> {
    const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`,
        { next: { revalidate: 60 } },
    );

    if (!res.ok) {
        throw new Error("Failed to fetch recipe details");
    }

    return res.json();
}

export default async function RecipeDetail({ id }: { id: string }) {
    try {
        const recipe = await getRecipeDetails(id);

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                    {recipe.image && (
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                        />
                    )}
                </div>

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

                    <div className="mb-6 flex flex-wrap gap-4">
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <span className="font-semibold">Cooking time:</span> {recipe.readyInMinutes} minutes
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            <span className="font-semibold">Servings:</span> {recipe.servings}
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-1">
                        {recipe.extendedIngredients.map(ingredient => (
                            <li key={ingredient.id} className="text-gray-700">
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>

                    {recipe.summary && (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                        </>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading recipe details:", error);
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-600">Error loading recipe details. Please try again later.</p>
            </div>
        );
    }
}
