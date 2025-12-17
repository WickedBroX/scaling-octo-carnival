import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';
import { getDesigns, deleteDesign, type SavedDesign } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('quote-flow-user') || '{}');
  const [designs, setDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    setDesigns(getDesigns());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('quote-flow-user');
    navigate('/auth');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Delete this design?")) {
      deleteDesign(id);
      setDesigns(getDesigns());
    }
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
        <p className="text-sm text-muted-foreground">Tap a design to edit.</p>

        {designs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm neu-pressed rounded-xl">
             No saved designs yet.
             <Button variant="link" onClick={() => navigate('/create')}>Create one now!</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {designs.map(design => (
               <div
                 key={design.id}
                 className="aspect-square neu-card overflow-hidden relative cursor-pointer group"
                 onClick={() => navigate(`/create?id=${design.id}`)}
               >
                 <div
                   className="w-full h-full p-4 flex flex-col items-center justify-center text-center"
                   style={{
                     backgroundColor: design.bgColor,
                     backgroundImage: design.bgImage ? `url(${design.bgImage})` : undefined,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     color: design.textColor,
                     fontFamily: design.fontFamily
                   }}
                 >
                   {design.bgImage && (
                     <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: `rgba(0,0,0,${design.overlayOpacity})` }}
                      />
                   )}
                   <div className="relative z-10 text-[10px] line-clamp-4 leading-tight">
                     {design.text}
                   </div>
                 </div>

                 <Button
                   size="icon"
                   variant="destructive"
                   className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                   onClick={(e) => handleDelete(e, design.id)}
                 >
                   <Trash2 size={12} />
                 </Button>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
