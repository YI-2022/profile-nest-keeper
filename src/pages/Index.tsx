
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Bienvenue</CardTitle>
          <CardDescription>
            Connectez-vous ou créez un compte pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link to="/login" className="w-full">
            <Button className="w-full" size="lg">
              Connexion
            </Button>
          </Link>
          <Link to="/register" className="w-full">
            <Button className="w-full" variant="outline" size="lg">
              Inscription
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Application d'authentification avec React
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
