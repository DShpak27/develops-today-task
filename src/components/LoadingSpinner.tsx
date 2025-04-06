export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="ml-4 text-lg text-gray-600">Loading recipes...</p>
        </div>
    );
}
