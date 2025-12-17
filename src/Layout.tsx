import { Outlet, NavLink } from 'react-router-dom';
import { Home, PlusSquare, User, Compass, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile container - Max width 430px (e.g. iPhone Pro Max) only on mobile */}
      {/* On desktop, we remove the max-w and flex-1 to fill space */}
      <div className="w-full md:w-auto flex-1 bg-background flex flex-col relative md:overflow-visible">

        {/* Header - Mobile Only */}
        <header className="h-16 flex items-center justify-center px-4 shrink-0 md:hidden border-b border-border/40">
          <h1 className="text-xl font-bold text-primary tracking-wide">QuoteFlow</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto md:overflow-visible px-4 pb-24 md:pb-8 md:px-8 scrollbar-hide max-w-[430px] md:max-w-none mx-auto md:mx-0 w-full">
          <Outlet />
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="fixed bottom-0 w-full md:hidden bg-background/90 backdrop-blur-md flex items-center justify-around pb-4 pt-2 border-t border-border z-50 max-w-[430px] left-1/2 -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <Home size={24} />
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <Search size={24} />
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 -mt-6 shadow-lg border border-border bg-background",
                isActive ? "text-primary bg-accent" : "text-primary hover:bg-accent"
              )
            }
          >
            <PlusSquare size={28} />
          </NavLink>

          <NavLink
            to="/discovery"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <Compass size={24} />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "text-primary bg-accent" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <User size={24} />
          </NavLink>
        </nav>
      </div>
      <Toaster />
    </div>
  );
}
