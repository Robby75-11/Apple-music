import App from "./App"; // Importa il componente principale App dell'applicazione.
import { Provider } from "react-redux"; // Importa il componente Provider da react-redux, che rende lo store Redux disponibile a tutti i componenti discendenti.
import React from "react"; // Importa la libreria React, necessaria per definire i componenti JSX.
import { createRoot } from "react-dom/client"; // Importa createRoot da react-dom/client, il nuovo modo per creare la radice per il rendering delle applicazioni React a partire dalla versione 18.
import "./index.css"; // Importa il foglio di stile globale dell'applicazione.
import { store } from "./redux/store"; // Importa lo store Redux configurato.

// Ottiene l'elemento DOM con l'id 'root', che di solito è un div vuoto nell'HTML principale (index.html).
const root = document.getElementById("root");

// Crea una radice React per l'elemento DOM 'root'. Questo è il punto di ingresso per il rendering dell'applicazione React.
createRoot(root).render(
  // Il componente Provider avvolge l'intero componente App.
  // La prop 'store' del Provider riceve l'istanza dello store Redux.
  // Questo rende lo store disponibile a tutti i componenti connessi all'interno di <App>.
  <Provider store={store}>
    {/* Renderizza il componente principale App dell'applicazione.
        Tutti i componenti all'interno di <App> potranno accedere allo store Redux se necessario
        tramite gli hook come useSelector e useDispatch o tramite la funzione connect (per componenti di classe). */}
    <App />
  </Provider>
);
