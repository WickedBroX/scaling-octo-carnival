import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Heart, Share2, Edit3, Loader2 } from 'lucide-react';
import { searchQuotes, type Quote, recordInteraction } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const data = await searchQuotes(query);
            setResults(data);
            setHasSearched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (quote: Quote) => {
        await recordInteraction(quote.id, 'remix');
        navigate(`/create?text=${encodeURIComponent(quote.text)}&author=${encodeURIComponent(quote.author)}`);
    };

    const handleLike = async (quoteId: number) => {
        await recordInteraction(quoteId, 'like');
    };

    const handleShare = async (quoteId: number) => {
        await recordInteraction(quoteId, 'share');
        if (navigator.share) {
            navigator.share({
                title: 'QuoteFlow',
                text: 'Check out this quote!',
                url: window.location.href
            }).catch(console.error);
        }
    };

    return (
        <div className="space-y-6 pt-4 pb-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Search</h2>
                    <p className="text-muted-foreground">Find quotes by topic, author, or keywords.</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Try 'Hope', 'Einstein', 'Love'..."
                            className="pl-9"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="default">
                        Go
                    </Button>
                </form>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-primary" size={24} />
                </div>
            ) : (
                <div className="space-y-6">
                    {hasSearched && results.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No results found.</p>
                    )}

                    {results.map((quote) => (
                        <Card key={quote.id} className="overflow-hidden">
                            <CardContent
                                className="p-6 flex flex-col items-center justify-center min-h-[160px] text-center space-y-3"
                                style={{ backgroundColor: quote.background_color || '#e0e5ec' }}
                            >
                                <p
                                    className="text-base font-medium leading-relaxed"
                                    style={{ fontFamily: quote.font_family || 'Inter, sans-serif', color: quote.text_color || '#334155' }}
                                >
                                    "{quote.text}"
                                </p>
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                                    — {quote.author}
                                </p>
                                {quote.category_name && (
                                    <span className="text-[10px] px-2 py-0.5 bg-white/50 rounded-full text-muted-foreground border border-black/5">
                                        {quote.category_name}
                                    </span>
                                )}
                            </CardContent>
                            <CardFooter className="bg-secondary/20 p-3 flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full hover:text-destructive"
                                        onClick={() => handleLike(quote.id)}
                                    >
                                        <Heart size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => handleShare(quote.id)}
                                    >
                                        <Share2 size={16} className="text-primary" />
                                    </Button>
                                </div>
                                <Button
                                    variant="neumorphic"
                                    size="sm"
                                    onClick={() => handleEdit(quote)}
                                    className="text-xs h-8"
                                >
                                    <Edit3 size={12} className="mr-2" />
                                    Remix
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
