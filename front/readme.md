#Chatbot
##Versions
Botkit : 4.6.1
axios 0.19.2
##Installation et
Voici le projet du bot développé sur Botkit4+. Pour le faire fonctionner, il suffit d'installer les modules nécessaires (versions précisées plus haut). J'ai décidé de ne pas utiliser Slack, il faut donc télécharger [l'émulateur] ( https://github.com/Microsoft/BotFramework-Emulator/releases ). Pour lancer le bot 

Prérequis de fonctionnement du chatbot : avoir lancé le back-end (../back)
1. Se placer dans le dossier front/
2. lancer le bot :`node bot.js` (le port 3000 doit être libre)
3. lancer l'émulateur
4. Accéder à la discussion depuis l'émulateur par l'URL du bot (http://localhost:3000/api/messages).
5. Chattez !

##Discussions possibles 

### Bonjour 

### Creer un ticket
Si les mots clés "cr.er" ou "cr.ation" sont entendus, le chatbot pose deux questions, une sur le titre et une sur la description du ticket, et envoit ensuite une requête POST via Axios.
### Consulter les tickets
Il est possible d'accéder aux tickets précédemment entrés et répertoriés dans le back-end en tapant "ticket" ou "voir".

##Troubleshooting

###Aucun ticket ou erreur de chargement

Il semble que le bot ait du mal à afficher les résultats de la consultation de tickets, je n'ai pas réussi à trouver la raison de cela, la requête à l'API aboutit, la conversation termine normalement, c'est peut être un problème au niveau de la fonction setVar, pourtant bien documentée. En relançant la requête voir il devrait y avoir un résultat.
