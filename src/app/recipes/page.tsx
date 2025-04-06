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
        <div className="p-4 bg-gray-50 h-[calc(100vh-64px)]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Recipes</h1>
                    <Link href="/" className="px-4 py-2 bg-[#166fd4] text-white rounded-md hover:bg-[#163fd4]">
                        Back to Search
                    </Link>
                </div>

                <Suspense fallback={<LoadingSpinner />}>
                    <RecipesList searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}
