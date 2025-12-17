import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, Share2, Edit3, MoreHorizontal, Link as LinkIcon, Twitter, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTimeline, recordInteraction, type Quote } from '@/lib/api';

export default function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTimeline = async () => {
    try {
        const data = await getTimeline();
        setQuotes(data);
    } catch (error) {
        console.error("Failed to load timeline", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem loading your timeline.",
        });
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
      toast({
        title: "Quote Liked!",
        description: "We've added this to your favorites.",
      });
  };

  const handleShare = async (quoteId: number, platform?: string) => {
      await recordInteraction(quoteId, 'share');

      const shareUrl = window.location.href;

      if (platform === 'copy') {
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Share link copied to clipboard.",
        });
        return;
      }

      if (navigator.share && !platform) {
          navigator.share({
              title: 'QuoteFlow',
              text: 'Check out this quote!',
              url: shareUrl
          }).catch(console.error);
      } else {
        toast({
            title: "Shared!",
            description: `Shared to ${platform || 'your feed'}.`,
        })
      }
  };

  if (loading) {
      return (
          <div className="space-y-6 pt-4 pb-8">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
          </div>
      );
  }

  return (
    <div className="space-y-6 pt-4 pb-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Timeline</h2>
        <p className="text-muted-foreground text-lg">Curated for your vibe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {quotes.map((quote) => (
          <Card key={quote.id} className="overflow-hidden flex flex-col border-2 hover:border-primary/50 transition-colors duration-300">
            <CardContent
                className="p-8 flex-1 flex flex-col items-center justify-center min-h-[240px] text-center space-y-6 relative group"
                style={{ backgroundColor: quote.background_color || '#f4f4f5' }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

              <p
                className="text-xl md:text-2xl font-bold leading-relaxed relative z-10"
                style={{ fontFamily: quote.font_family || 'Inter, sans-serif', color: quote.text_color || '#334155' }}
              >
                "{quote.text}"
              </p>

              <div className="flex flex-col items-center gap-2 relative z-10">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
                    — {quote.author}
                </p>
                {quote.subcategory_name && (
                    <span className="text-[10px] px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground border border-border/50">
                        {quote.subcategory_name}
                    </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="bg-card p-3 flex justify-between items-center border-t border-border">
              <div className="flex space-x-1">
                 <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-full hover:text-red-500 hover:bg-red-50"
                    onClick={() => handleLike(quote.id)}
                 >
                    <Heart size={18} />
                 </Button>

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                            <Share2 size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleShare(quote.id, 'copy')}>
                            <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(quote.id, 'twitter')}>
                            <Twitter className="mr-2 h-4 w-4" /> Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(quote.id, 'facebook')}>
                            <Facebook className="mr-2 h-4 w-4" /> Facebook
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>

              <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(quote)}
                    className="text-xs font-semibold h-8"
                >
                    <Edit3 size={14} className="mr-2" />
                    Remix
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full md:hidden">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(quote)}>
                            Remix Quote
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Report
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
