
// Ce fichier est un point d'entrée pour les commandes npm qui tentent d'exécuter src/index.ts
// Pour démarrer correctement l'application React avec Vite, utilisez:
// npx vite

console.log('Ce projet est une application React frontend avec Vite.');
console.log('Pour démarrer le serveur de développement Vite, utilisez: npx vite');
console.log('Démarrage du serveur Vite...');

import { spawn } from 'child_process';

// Lancer Vite directement
const viteProcess = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

viteProcess.on('error', (error) => {
  console.error('Erreur lors du démarrage de Vite:', error);
  console.log('Vérifiez que Vite est installé correctement.');
  console.log('Vous pouvez essayer: npx vite directement');
});
