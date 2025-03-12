
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Ici vous intégrerez la logique de changement de mot de passe avec votre backend Node.js
      console.log('Changing password:', currentPassword, newPassword);
      
      // Simulons un changement de mot de passe réussi après 1 seconde
      setTimeout(() => {
        toast({
          title: "Mot de passe modifié",
          description: "Votre mot de passe a été changé avec succès",
        });
        
        // Réinitialisation des champs
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Fermer automatiquement le dialog
        document.querySelector<HTMLButtonElement>('[data-dialog-close]')?.click();
      }, 1000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du changement de mot de passe",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">Annuler</Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Changement en cours..." : "Changer le mot de passe"}
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
