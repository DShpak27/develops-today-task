import Image from "next/image";
import Link from "next/link";
import { getRecipes, type SearchParams } from "@/components/RecipesList/RecipesList.funcs";

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

        const stringParams: Record<string, string> = {};
        Object.entries(searchParams).forEach(([key, value]) => {
            if (typeof value === "string") {
                stringParams[key] = value;
            }
        });

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black/75">
                {data.results.map(recipe => (
                    <Link
                        href={{
                            pathname: `/recipes/${recipe.id}`,
                            query: {
                                returnTo: new URLSearchParams(stringParams).toString(),
                            },
                        }}
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
        console.error("API Error:", error);
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-600">Error loading recipes. Please try again later.</p>
            </div>
        );
    }
}
