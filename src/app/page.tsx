"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [query, setQuery] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [maxTime, setMaxTime] = useState<string>("");
    const router = useRouter();

    const isFormValid: boolean = Boolean(query || cuisine || maxTime);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (cuisine) params.append("cuisine", cuisine);
        if (maxTime) params.append("maxReadyTime", maxTime);

        router.push(`/recipes?${params.toString()}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Recipe Search</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                            Recipe Query
                        </label>
                        <input
                            type="text"
                            id="query"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="e.g., pasta, chicken"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                            Cuisine
                        </label>
                        <select
                            id="cuisine"
                            value={cuisine}
                            onChange={e => setCuisine(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select cuisine</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Indian">Indian</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="maxTime" className="block text-sm font-medium text-gray-700">
                            Maximum Cooking Time (minutes)
                        </label>
                        <input
                            type="number"
                            id="maxTime"
                            value={maxTime}
                            onChange={e => setMaxTime(e.target.value)}
                            min="1"
                            placeholder="e.g., 30"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                            isFormValid
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </form>
            </div>
        </main>
    );
}
