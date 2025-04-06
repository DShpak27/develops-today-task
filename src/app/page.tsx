"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormValues, formSchema, initialFormValues } from "@/app/page.funcs";

export default function Home() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialFormValues,
        mode: "onChange",
    });

    const onSubmit = (data: FormValues) => {
        const params = new URLSearchParams();
        if (data.query) params.append("query", data.query);
        if (data.cuisine) params.append("cuisine", data.cuisine);
        if (data.maxReadyTime) params.append("maxReadyTime", data.maxReadyTime);

        router.push(`/recipes?${params.toString()}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Recipe Search</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                            Recipe Query
                        </label>
                        <input
                            {...register("query")}
                            type="text"
                            id="query"
                            placeholder="e.g., pasta, chicken"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.query && <p className="mt-1 text-sm text-red-600">{errors.query.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                            Cuisine
                        </label>
                        <select
                            {...register("cuisine")}
                            id="cuisine"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select cuisine</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Indian">Indian</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                        {errors.cuisine && <p className="mt-1 text-sm text-red-600">{errors.cuisine.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="maxReadyTime" className="block text-sm font-medium text-gray-700">
                            Maximum Cooking Time (minutes)
                        </label>
                        <input
                            {...register("maxReadyTime")}
                            type="number"
                            id="maxReadyTime"
                            min="1"
                            placeholder="e.g., 30"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.maxReadyTime && (
                            <p className="mt-1 text-sm text-red-600">{errors.maxReadyTime.message}</p>
                        )}
                    </div>

                    {errors.root?.message && <p className="text-sm text-red-600">{errors.root.message}</p>}

                    <button
                        type="submit"
                        disabled={!isDirty || !isValid}
                        className={`w-full py-2 px-4 rounded-md focus:outline-none ${
                            isDirty && isValid
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
