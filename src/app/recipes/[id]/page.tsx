import Link from "next/link";
import { Suspense } from "react";
import RecipeDetail from "@/components/RecipeDetail";
import LoadingSpinner from "@/components/LoadingSpinner";

export const revalidate = 60;

interface RecipeDetailPageProps {
    params: {
        id: string;
    };
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
    const { id } = params;

    return (
        <main className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/recipes" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
                        <span>← Back to recipes</span>
                    </Link>
                </div>

                <Suspense fallback={<LoadingSpinner />}>
                    <RecipeDetail id={id} />
                </Suspense>
            </div>
        </main>
    );
}
