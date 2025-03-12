
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Utilisateur',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Simulons la récupération des données utilisateur
    setUser({
      name: 'Utilisateur',
      email: userEmail || 'utilisateur@example.com',
    });
    setEditedName('Utilisateur');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    
    navigate('/login');
  };

  const handleSaveProfile = () => {
    // Ici vous intégrerez la logique de mise à jour du profil avec votre backend Node.js
    setUser({
      ...user,
      name: editedName,
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Consultez et modifiez vos informations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-background">{user.name}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="p-2 border rounded-md bg-background">{user.email}</div>
              </div>
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <div className="flex space-x-2 w-full">
                  <Button className="flex-1" onClick={handleSaveProfile}>Enregistrer</Button>
                  <Button className="flex-1" variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
                </div>
              ) : (
                <Button className="w-full" onClick={() => setIsEditing(true)}>Modifier le profil</Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez votre mot de passe et la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <div className="p-2 border rounded-md bg-background">••••••••</div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Changer le mot de passe</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Changer votre mot de passe</DialogTitle>
                  </DialogHeader>
                  <PasswordChangeForm />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
