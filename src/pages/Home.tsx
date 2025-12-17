import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Edit3, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTimeline, recordInteraction, type Quote } from '@/lib/api';

export default function Home() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, []);

  const loadTimeline = async () => {
    try {
        const data = await getTimeline();
        setQuotes(data);
    } catch (error) {
        console.error("Failed to load timeline", error);
    } finally {
        setLoading(false);
    }
  };

  const handleEdit = async (quote: Quote) => {
    await recordInteraction(quote.id, 'remix');
    navigate(`/create?text=${encodeURIComponent(quote.text)}&author=${encodeURIComponent(quote.author)}`);
  };

  const handleLike = async (quoteId: number) => {
      // Optimistic UI update or just fire and forget?
      // Fire and forget for now, but in a real app toggle state
      await recordInteraction(quoteId, 'like');
  };

  const handleShare = async (quoteId: number) => {
      await recordInteraction(quoteId, 'share');
      // Native share API or fallback
      if (navigator.share) {
          navigator.share({
              title: 'QuoteFlow',
              text: 'Check out this quote!',
              url: window.location.href
          }).catch(console.error);
      }
  };

  // Track views? A simplified intersection observer could go here.
  // For now, we assume if it's in the list, it's "viewed" loosely or when clicked.

  if (loading) {
      return (
          <div className="flex justify-center items-center h-[50vh]">
              <Loader2 className="animate-spin text-primary" size={32} />
          </div>
      );
  }

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Timeline</h2>
        <p className="text-muted-foreground">Curated for your vibe.</p>
      </div>

      <div className="space-y-6">
        {quotes.map((quote) => (
          <Card key={quote.id} className="overflow-hidden">
            <CardContent
                className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center space-y-4"
                style={{ backgroundColor: quote.background_color || '#e0e5ec' }}
            >
              <p
                className="text-lg font-medium leading-relaxed"
                style={{ fontFamily: quote.font_family || 'Inter, sans-serif', color: quote.text_color || '#334155' }}
              >
                "{quote.text}"
              </p>
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                — {quote.author}
              </p>
              {quote.subcategory_name && (
                  <span className="text-xs px-2 py-1 bg-white/50 rounded-full text-muted-foreground">
                      {quote.subcategory_name}
                  </span>
              )}
            </CardContent>
            <CardFooter className="bg-secondary/20 p-4 flex justify-between items-center">
              <div className="flex space-x-2">
                 <Button
                    variant="ghost"
                    size="icon"
                    className="neu-btn w-10 h-10 rounded-full hover:text-destructive active:text-destructive"
                    onClick={() => handleLike(quote.id)}
                 >
                    <Heart size={18} />
                 </Button>
                 <Button
                    variant="ghost"
                    size="icon"
                    className="neu-btn w-10 h-10 rounded-full"
                    onClick={() => handleShare(quote.id)}
                 >
                    <Share2 size={18} className="text-primary" />
                 </Button>
              </div>
              <Button
                variant="neumorphic"
                size="sm"
                onClick={() => handleEdit(quote)}
                className="text-xs"
              >
                <Edit3 size={14} className="mr-2" />
                Remix
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
