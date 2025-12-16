import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('quote-flow-user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('quote-flow-user');
    navigate('/auth');
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <p className="text-muted-foreground">Manage your account.</p>
      </div>

      <div className="neu-card p-6 flex flex-col items-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary neu-pressed flex items-center justify-center text-2xl font-bold text-primary">
          {user.email ? user.email[0].toUpperCase() : 'G'}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{user.email || 'Guest User'}</h3>
          <p className="text-sm text-muted-foreground">{user.email ? 'Member' : 'Not signed in'}</p>
        </div>

        {!user.email && (
          <Button className="w-full" onClick={() => navigate('/auth')}>
            Sign In / Sign Up
          </Button>
        )}

        {user.email && (
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Log Out
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Your Designs</h3>
        <p className="text-sm text-muted-foreground">Saved designs will appear here.</p>
        {/* Placeholder for saved designs grid */}
        <div className="grid grid-cols-2 gap-4 mt-4 opacity-50">
          <div className="aspect-square neu-pressed rounded-xl flex items-center justify-center">?</div>
          <div className="aspect-square neu-pressed rounded-xl flex items-center justify-center">?</div>
        </div>
      </div>
    </div>
  );
}
