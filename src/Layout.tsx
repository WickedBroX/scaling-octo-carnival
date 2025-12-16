import { Outlet, NavLink } from 'react-router-dom';
import { Home, PlusSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Mobile container - Max width 430px (e.g. iPhone Pro Max) */}
      <div className="w-full max-w-[430px] min-h-screen bg-background flex flex-col shadow-2xl relative">

        {/* Header */}
        <header className="h-16 flex items-center justify-center px-4 shrink-0">
          <h1 className="text-xl font-bold text-primary tracking-wide">QuoteFlow</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-background/90 backdrop-blur-md flex items-center justify-around pb-4 border-t border-border z-50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "neu-pressed text-primary" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <Home size={24} />
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 -mt-6",
                isActive ? "neu-pressed text-primary" : "neu-btn text-primary"
              )
            }
          >
            <PlusSquare size={28} />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200",
                isActive ? "neu-pressed text-primary" : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <User size={24} />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
