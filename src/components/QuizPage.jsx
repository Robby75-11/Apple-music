import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import QuizGame from "./QuizGame";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/quiz/brani/${id}?numeroDomande=3`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }
        );

        setQuiz(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Errore quiz:", err);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          setError("Non sei autorizzato. Effettua il login.");
        } else {
          setError("Impossibile caricare il quiz. Riprova più tardi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
    return () => controller.abort();
  }, [id, navigate]);

  if (loading)
    return <div className="container text-white mt-5">Caricamento…</div>;
  if (error) return <div className="container text-white mt-5">{error}</div>;
  if (!quiz)
    return (
      <div className="container text-white mt-5">Nessun quiz trovato.</div>
    );

  return (
    <div className="container text-white mt-5">
      <h2 className="mb-4">{quiz.titolo || "Quiz Brano"}</h2>
      <QuizGame quizData={quiz} />
    </div>
  );
};

export default QuizPage;
