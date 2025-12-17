import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDiscovery, type Quote, recordInteraction } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function Discovery() {
    const navigate = useNavigate();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getDiscovery();
                setQuotes(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSelect = async (quote: Quote) => {
        // Record view/click
        await recordInteraction(quote.id, 'view');
        // Navigate to create/remix directly or open a detail view?
        // Prompt implies "feed view if clicked".
        // For simplicity, let's open it in the editor ("Remix") which effectively acts as a detail view
        // OR we could have a modal. Let's send to Editor for now as it drives engagement.
        navigate(`/create?text=${encodeURIComponent(quote.text)}&author=${encodeURIComponent(quote.author)}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-4 pt-4 pb-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Explore</h2>
                <p className="text-muted-foreground">Find your next inspiration.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {quotes.map(quote => (
                    <div
                        key={quote.id}
                        onClick={() => handleSelect(quote)}
                        className="aspect-square bg-card rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-80 transition-opacity shadow-sm border border-border"
                        style={{ backgroundColor: quote.background_color }}
                    >
                        <p className="text-xs font-medium line-clamp-4" style={{ fontFamily: quote.font_family }}>
                            "{quote.text}"
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase">
                            {quote.category_name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
