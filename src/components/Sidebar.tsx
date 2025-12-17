import { NavLink } from 'react-router-dom';
import { Home, PlusSquare, User, Compass, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border min-h-screen p-4 space-y-8 sticky top-0 h-screen">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-primary tracking-wide">QuoteFlow</h1>
      </div>

      <nav className="flex flex-col space-y-2">
        <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )
            }
          >
            <Home size={24} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )
            }
          >
            <Search size={24} />
            <span>Search</span>
          </NavLink>

          <NavLink
            to="/discovery"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )
            }
          >
            <Compass size={24} />
            <span>Discovery</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )
            }
          >
            <User size={24} />
            <span>Profile</span>
          </NavLink>
      </nav>

      <div className="mt-auto px-4">
        <NavLink to="/create">
            <Button className="w-full gap-2 text-md font-bold py-6" size="lg">
                <PlusSquare size={20} />
                Create Quote
            </Button>
        </NavLink>
      </div>
    </div>
  );
}
