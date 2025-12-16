import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INITIAL_QUOTES } from '@/data/quotes';
import { Heart, Share2, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  // In a real app, this would come from a store or API
  const [quotes] = useState(INITIAL_QUOTES);

  const handleEdit = (quoteText: string, quoteAuthor: string) => {
    navigate(`/create?text=${encodeURIComponent(quoteText)}&author=${encodeURIComponent(quoteAuthor)}`);
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Discover</h2>
        <p className="text-muted-foreground">Daily inspiration from Einstein.</p>
      </div>

      <div className="space-y-6">
        {quotes.map((quote) => (
          <Card key={quote.id} className="overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
              <p className="text-lg font-medium leading-relaxed" style={{ fontFamily: quote.fontFamily }}>
                "{quote.text}"
              </p>
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                — {quote.author}
              </p>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-4 flex justify-between items-center">
              <div className="flex space-x-2">
                 <Button variant="ghost" size="icon" className="neu-btn w-10 h-10 rounded-full">
                    <Heart size={18} className="text-destructive" />
                 </Button>
                 <Button variant="ghost" size="icon" className="neu-btn w-10 h-10 rounded-full">
                    <Share2 size={18} className="text-primary" />
                 </Button>
              </div>
              <Button
                variant="neumorphic"
                size="sm"
                onClick={() => handleEdit(quote.text, quote.author)}
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
