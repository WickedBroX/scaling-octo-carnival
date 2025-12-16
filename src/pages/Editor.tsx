import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Shuffle, Type, Palette, Layout as LayoutIcon } from 'lucide-react';
import { GOOGLE_FONTS } from '@/data/quotes';

export default function Editor() {
  const [searchParams] = useSearchParams();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState(searchParams.get('text') || "Start creating...");
  const [author, setAuthor] = useState(searchParams.get('author') || "You");

  const [fontFamily, setFontFamily] = useState(GOOGLE_FONTS[0]);
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#334155");
  const [bgColor, setBgColor] = useState("#e0e5ec");
  const [gradient, setGradient] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${GOOGLE_FONTS.join('&family=').replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleDownload = async () => {
    if (canvasRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'quote-flow-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemix = () => {
    const randomFont = GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)];
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    // const randomBg = `#${Math.floor(Math.random()*16777215).toString(16)}`;

    setFontFamily(randomFont);
    setTextColor(randomColor);
    // Keep background light-ish for readability usually, but let's just go random
    // setBgColor(randomBg);
  };

  const backgroundStyle = gradient
    ? { background: `linear-gradient(135deg, ${bgColor}, #ffffff)` }
    : { backgroundColor: bgColor };

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Create Quote</h2>
        <p className="text-muted-foreground">Design your masterpiece.</p>
      </div>

      {/* Canvas Area */}
      <div className="flex justify-center">
        <div
          ref={canvasRef}
          className="w-full aspect-square neu-card flex flex-col items-center justify-center p-8 text-center transition-all duration-300 relative overflow-hidden"
          style={{
            ...backgroundStyle,
            fontFamily: fontFamily,
            color: textColor,
          }}
        >
          <div
            className="text-center font-medium leading-relaxed break-words w-full whitespace-pre-wrap"
             style={{ fontSize: `${fontSize}px` }}
          >
            {text}
          </div>
          <div className="mt-6 text-sm opacity-80 font-semibold tracking-wider uppercase">
            — {author}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="neu-card p-4 space-y-4">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2 p-0 h-auto">
             <TabsTrigger value="text" className="h-10 text-xs"><Type size={16} /></TabsTrigger>
             <TabsTrigger value="font" className="h-10 text-xs"><LayoutIcon size={16} /></TabsTrigger>
             <TabsTrigger value="color" className="h-10 text-xs"><Palette size={16} /></TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Quote Text</label>
              <textarea
                className="w-full min-h-[80px] rounded-md border-none neu-pressed p-3 text-sm focus:outline-none bg-transparent"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Author</label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="font" className="space-y-4 pt-4">
             <div className="space-y-2">
               <label className="text-xs font-medium">Font Family</label>
               <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto p-1">
                 {GOOGLE_FONTS.map(font => (
                   <button
                     key={font}
                     onClick={() => setFontFamily(font)}
                     className={`p-2 text-xs rounded-lg text-left truncate ${fontFamily === font ? 'neu-pressed text-primary' : 'hover:bg-black/5'}`}
                     style={{ fontFamily: font }}
                   >
                     {font}
                   </button>
                 ))}
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-xs font-medium">Size: {fontSize}px</label>
               <Slider
                 min={12}
                 max={48}
                 step={1}
                 value={[fontSize]}
                 onValueChange={(vals) => setFontSize(vals[0])}
               />
             </div>
          </TabsContent>

          <TabsContent value="color" className="space-y-4 pt-4">
             <div className="space-y-2">
               <label className="text-xs font-medium">Text Color</label>
               <div className="flex gap-2 overflow-x-auto pb-2">
                 {['#334155', '#1e293b', '#0f172a', '#ffffff', '#000000', '#ef4444', '#3b82f6'].map(c => (
                   <button
                     key={c}
                     onClick={() => setTextColor(c)}
                     className={`w-8 h-8 rounded-full border-2 ${textColor === c ? 'border-primary' : 'border-transparent'}`}
                     style={{ backgroundColor: c }}
                   />
                 ))}
                 <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 opacity-0 absolute" />
               </div>
             </div>

             <div className="space-y-2">
               <label className="text-xs font-medium">Background Color</label>
               <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-full rounded cursor-pointer"
                  />
                  <Button
                    variant={gradient ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGradient(!gradient)}
                    className="whitespace-nowrap"
                  >
                    Gradient
                  </Button>
               </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="neu-btn" onClick={handleRemix}>
          <Shuffle size={18} className="mr-2" /> Remix
        </Button>
        <Button onClick={handleDownload} className="neu-btn bg-primary text-primary-foreground">
          <Download size={18} className="mr-2" /> Save
        </Button>
      </div>
    </div>
  );
}
