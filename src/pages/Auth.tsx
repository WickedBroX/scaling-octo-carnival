import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mock login function
  const handleLogin = () => {
    // Simulate getting a User ID from backend
    const userId = uuidv4();
    localStorage.setItem('quote-flow-user', JSON.stringify({ email, id: userId }));
    // Clear guest ID to prioritize logged in user, or keep it to merge?
    // For now, simpler to just replace/ignore guest if logged in.
    navigate('/');
  };

  const handleGuest = () => {
      // Ensure guest ID exists
      let guestId = localStorage.getItem('quote-flow-guest-id');
      if (!guestId) {
          guestId = uuidv4();
          localStorage.setItem('quote-flow-guest-id', guestId);
      }
      navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
       <div className="text-center space-y-2">
         <h1 className="text-3xl font-bold text-primary">QuoteFlow</h1>
         <p className="text-muted-foreground">Design, Share, Inspire.</p>
       </div>

       <Tabs defaultValue="login" className="w-full max-w-sm">
         <TabsList className="grid w-full grid-cols-2">
           <TabsTrigger value="login">Login</TabsTrigger>
           <TabsTrigger value="signup">Sign Up</TabsTrigger>
         </TabsList>

         <TabsContent value="login">
           <Card>
             <CardHeader>
               <CardTitle>Welcome back</CardTitle>
               <CardDescription>Enter your credentials to access your account.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Email</label>
                 <Input type="email" placeholder="hello@example.com" value={email} onChange={e => setEmail(e.target.value)} />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Password</label>
                 <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
               </div>
             </CardContent>
             <CardFooter>
               <Button className="w-full" onClick={handleLogin}>Log In</Button>
             </CardFooter>
           </Card>
         </TabsContent>

         <TabsContent value="signup">
           <Card>
             <CardHeader>
               <CardTitle>Create an account</CardTitle>
               <CardDescription>Start your journey with QuoteFlow.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Email</label>
                 <Input type="email" placeholder="hello@example.com" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Password</label>
                 <Input type="password" placeholder="••••••••" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Confirm Password</label>
                 <Input type="password" placeholder="••••••••" />
               </div>
             </CardContent>
             <CardFooter>
               <Button className="w-full" onClick={handleLogin}>Sign Up</Button>
             </CardFooter>
           </Card>
         </TabsContent>
       </Tabs>

       <Button variant="ghost" onClick={handleGuest}>
         Continue as Guest
       </Button>
    </div>
  );
}
