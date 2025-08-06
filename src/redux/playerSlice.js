import { createSlice } from "@reduxjs/toolkit"; // Importa la funzione createSlice da @reduxjs/toolkit, che semplifica la creazione di slice di reducer Redux.

// Definisce lo stato iniziale per la slice 'player'.
const initialState = {
  currentTrack: null, // Inizialmente, nessuna traccia è selezionata come corrente.
};

// Crea una "slice" di reducer Redux chiamata 'player'.
// Una slice include automaticamente un nome, uno stato iniziale e delle funzioni reducer.
const playerSlice = createSlice({
  name: "player", // Il nome di questa slice nel Redux store. Sarà usato come prefisso per i tipi di azione.
  initialState, // Lo stato iniziale definito sopra.

  // Definisce le funzioni reducer per questa slice.
  // Ogni chiave in questo oggetto diventerà un generatore di azioni.
  reducers: {
    // Reducer per impostare la traccia corrente.
    // 'state' è lo stato corrente della slice.
    // 'action' è un oggetto che contiene il tipo dell'azione e un payload (dati).
    setCurrentTrack: (state, action) => {
      // Aggiorna la proprietà 'currentTrack' nello stato con il payload dell'azione.
      // 'action.payload' conterrà l'oggetto della traccia da impostare come corrente.
      state.currentTrack = action.payload;
    },
  },
});

// Esporta i generatori di azioni creati automaticamente da createSlice.
// In questo caso, esportiamo 'setCurrentTrack', che può essere dispatchata per aggiornare lo stato.
export const { setCurrentTrack } = playerSlice.actions;

// Esporta il reducer generato da createSlice.
// Questo reducer sarà combinato con altri reducer (se presenti) nel root reducer dello store Redux.
export default playerSlice.reducer;
