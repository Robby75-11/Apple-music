import { useEffect, useState } from "react";
import { audioRef } from "./Player";

const QuizGame = ({ quizData, onComplete }) => {
  if (!quizData || !quizData.domande || quizData.domande.length === 0) {
    return (
      <p className="text-center mt-5">
        Quiz non disponibile o in caricamento...
      </p>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [needPlayClick, setNeedPlayClick] = useState(false);

  const domanda = quizData.domande[currentQuestion];
  const totalQuestions = quizData.domande.length;

  // 🔹 Utility
  const isHttpUrl = (s) => !!s && /^https?:\/\//.test(s);
  const isAudioQuestion = domanda?.testo
    ?.toLowerCase()
    .startsWith("quale brano stai ascoltando");

  // TIMER
  useEffect(() => {
    if (!started || selected !== null || showResult) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, started, selected, showResult]);

  // AUDIO AUTO-PLAY
  useEffect(() => {
    setNeedPlayClick(false);
    if (!isAudioQuestion || !isHttpUrl(domanda?.snippet)) return;
    audioRef.current?.pause();
    audioRef.current = new Audio(domanda.snippet);
    audioRef.current.play().catch(() => setNeedPlayClick(true));
  }, [currentQuestion]);

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === domanda.rispostaCorretta) setScore((prev) => prev + 1);
    setTimeout(() => handleNext(), 800);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      setShowResult(true);
      if (onComplete) onComplete({ score: score, total: totalQuestions });
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setTimeLeft(30);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setStarted(false);
  };

  const progressoPercentuale = Math.round(
    (currentQuestion / Math.max(1, totalQuestions - 1)) * 100
  );

  if (!started) {
    return (
      <div className="text-center mt-5">
        <h2>🎵 Benvenuto nel quiz musicale!</h2>
        <button
          onClick={() => setStarted(true)}
          style={{
            padding: "10px 30px",
            fontSize: "18px",
            backgroundColor: "aquamarine",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Inizia il quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="text-center mt-5">
        <h2>✅ Quiz completato!</h2>
        <p>
          Hai totalizzato <strong>{score}</strong> su{" "}
          <strong>{totalQuestions}</strong> punti.
        </p>
        <button className="btn btn-outline-light mt-3" onClick={handleRetry}>
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        padding: "2rem",
        maxWidth: 700,
        margin: "auto",
      }}
    >
      {/* TIMER */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "aquamarine",
          color: "black",
          padding: "10px 20px",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 0 10px aquamarine",
        }}
      >
        ⏱️ {timeLeft}s
      </div>

      {/* BARRA DI PROGRESSO */}
      <div
        style={{
          height: "10px",
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progressoPercentuale}%`,
            height: "100%",
            backgroundColor: "aquamarine",
            transition: "width 0.3s",
          }}
        />
      </div>

      {/* NUMERO DOMANDA */}
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Domanda {currentQuestion + 1} di {totalQuestions}
      </p>

      {/* TESTO DOMANDA */}
      <h4 style={{ marginBottom: "20px", whiteSpace: "pre-line" }}>
        {domanda.testo}
      </h4>

      {/* AUDIO PLAYER O PULSANTE */}
      {isAudioQuestion && isHttpUrl(domanda.snippet) && (
        <div style={{ marginBottom: "20px" }}>
          {needPlayClick ? (
            <button
              className="btn btn-info"
              onClick={() => {
                audioRef.current?.play();
                setNeedPlayClick(false);
              }}
            >
              ▶️ Riproduci audio
            </button>
          ) : (
            <audio
              src={domanda.snippet}
              controls
              autoPlay
              style={{ width: "100%" }}
            />
          )}
        </div>
      )}

      {/* OPZIONI */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {domanda.opzioni.map((option, i) => {
          let bgColor = "#0d6efd";
          if (selected) {
            if (option === domanda.rispostaCorretta)
              bgColor = "#98FB98"; // verde
            else if (option === selected) bgColor = "#F08080"; // rosso
          }
          return (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              style={{
                cursor: selected ? "default" : "pointer",
                backgroundColor: bgColor,
                color: "black",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                transition: "0.3s",
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuizGame;
