import SearchResults from "@/components/search/SearchResults";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

export default async function SearchPage({
    searchParams,
}: SearchPageProps) {
    const { q } = await searchParams;

    return (
        <div className="pt-20 px-6">
            <SearchResults query={q || ""} />
        </div>
    );
}