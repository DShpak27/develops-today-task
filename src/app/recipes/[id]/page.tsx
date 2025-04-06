import Link from "next/link";
import { Suspense } from "react";
import RecipeDetail from "@/components/RecipeDetail/RecipeDetail";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export const revalidate = 60;

interface RecipeDetailPageProps {
    params: {
        id: string;
    };
    searchParams: {
        returnTo?: string;
    };
}

export default async function RecipeDetailPage({ params, searchParams }: RecipeDetailPageProps) {
    const { id } = await params;

    const resolvedSearchParams = await searchParams;
    const { returnTo } = resolvedSearchParams;

    const backUrl = returnTo ? `/recipes?${returnTo}` : "/recipes";

    return (
        <div className="p-4 bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href={backUrl} className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                        <span>← Back to recipes</span>
                    </Link>
                </div>

                <Suspense fallback={<LoadingSpinner />}>
                    <RecipeDetail id={id} />
                </Suspense>
            </div>
        </div>
    );
}
