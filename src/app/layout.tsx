import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
    title: "Recipe Search App",
    description: "Search recipes by ingredients, cuisines, and cooking time.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <header className="shadow-md bg-[#166fd4] h-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
                        <Link href="/" className="flex items-center group">
                            <h1 className="text-2xl font-bold text-white transition-transform group-hover:scale-105">
                                Recipe Search App
                            </h1>
                        </Link>
                    </div>
                </header>
                <main className="flex-grow bg-amber-600">{children}</main>
            </body>
        </html>
    );
}
