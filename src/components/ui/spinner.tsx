export function Spinner() {
    return(
        <div className="w-full min-h-screen flex items-center justify-center bg-black">
            <div className="h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}