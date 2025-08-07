import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token"); // recupera il token JWT
        const response = await axios.get(
          `http://localhost:8080/api/quiz/brani/${id}?numeroDomande=4`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // aggiungi header
            },
          }
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("❌ Errore nel caricamento del quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  return (
    <div className="container text-white mt-5">
      <h2>Quiz Brano</h2>
      {quiz ? (
        quiz.domande.map((d, i) => (
          <div key={i} className="mb-4">
            <h5>{d.testo}</h5>
            <ul>
              {d.opzioni.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </div>
  );
};

export default QuizPage;
