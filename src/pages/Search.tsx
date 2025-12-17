import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Search</h1>
        <p className="text-muted-foreground">Find inspiration and quotes</p>
      </div>

      {/* Search Input */}
      <div className="px-4 mb-8">
        <div className="neu-pressed rounded-2xl p-4 flex items-center gap-3">
          <SearchIcon className="text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search keywords, authors, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="px-4">
        <div className="neu-flat rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">
            {query ? `Searching for "${query}"...` : "Start typing to search"}
          </p>
        </div>
      </div>
    </div>
  );
}
