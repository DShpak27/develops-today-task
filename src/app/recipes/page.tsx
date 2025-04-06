import Link from "next/link";
import { Suspense } from "react";
import RecipesList from "@/components/RecipesList/RecipesList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export const revalidate = 60;

interface SearchParams {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
}

export default function RecipesPage({ searchParams }: { searchParams: SearchParams }) {
    return (
        <main className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Recipes</h1>
                    <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Back to Search
                    </Link>
                </div>

                <Suspense fallback={<LoadingSpinner />}>
                    <RecipesList searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
}
