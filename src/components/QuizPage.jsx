import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizGame from "./QuizGame";

const QuizPage = () => {
  const { id } = useParams(); //
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ Nessun token trovato.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/quiz/brani/${id}?numeroDomande=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuiz(res.data);
      })
      .catch((err) => {
        console.error("❌ Errore nel caricamento del quiz:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Caricamento quiz...</p>;
  if (!quiz) return <p className="text-center mt-5">Quiz non disponibile.</p>;

  return <QuizGame quizData={quiz} />;
};

export default QuizPage;
