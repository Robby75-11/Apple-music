import { useEffect, useState } from "react";
import axios from "axios";
import QuizGame from "./QuizGame";

export default function QuizBraniPubblico() {
  const [quiz, setQuiz] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/quiz/brani?numeroDomande=4")
      .then((res) => setQuiz(res.data))
      .catch(() => setErr("Errore nel caricamento del quiz"));
  }, []);

  if (err) return <div className="container text-white mt-5">{err}</div>;
  if (!quiz)
    return <div className="container text-white mt-5">Caricamento…</div>;

  return (
    <div className="container text-white mt-5">
      <h2 className="mb-4">{quiz.titolo || "Quiz Brani"}</h2>
      <QuizGame quizData={quiz} />
    </div>
  );
}
