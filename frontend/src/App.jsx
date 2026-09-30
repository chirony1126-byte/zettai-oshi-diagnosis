import { calculateResult } from "./utils/calculateResult";
import { useState } from "react";

import "./App.css";

import QuestionScreen from "./components/QuestionScreen";
import AnalyzingScreen from "./components/AnalyzingScreen";
import ResultScreen from "./components/ResultScreen";
import { questions } from "./data/questions";

async function saveDiagnosis(result, answers) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/diagnoses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          first_member: result.top3[0].member,
          second_member: result.top3[1].member,
          third_member: result.top3[2].member,

          answers: answers.map((answer) => ({
            question_id: answer.questionId,
            answer_id: answer.answerId,
          })),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("診断結果の保存に失敗しました");
    }

  const data = await response.json();

console.log("DB保存成功♡", data);

return data.session_id;

  } catch (error) {
    console.error("DB保存エラー:", error);
    return null;
  }
}

async function saveFeedback(
  sessionId,
  reaction,
  interestedMember
) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          reaction: reaction,
          interested_member: interestedMember,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("フィードバック保存に失敗しました");
    }

    const data = await response.json();

    console.log("フィードバック保存成功♡", data);

    return true;
  } catch (error) {
    console.error("フィードバック保存エラー:", error);

    return false;
  }
}

function App() {
  const [screen, setScreen] = useState("top");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const startDiagnosis = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScreen("question");
    setIsSubmitting(false);
  };

const handleAnswer = async (answer) => {
  // 連打による二重処理を防止
  if (isSubmitting) return;

  const updatedAnswers = [
    ...answers,
    {
      questionId: questions[currentQuestion].id,
      answerId: answer.id,
      scores: answer.scores,
    },
  ];

  setAnswers(updatedAnswers);

  // まだ次の質問がある
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    return;
  }

  // 最終問題
  setIsSubmitting(true);

  const calculatedResult = calculateResult(updatedAnswers);

  console.log("診断終了♡");
  console.log("全スコア:", calculatedResult.scores);
  console.log("TOP3:", calculatedResult.top3);

  setResult(calculatedResult);

  setScreen("analyzing");

  const savedSessionId = await saveDiagnosis(
        calculatedResult,
        updatedAnswers
      );

    setSessionId(savedSessionId);
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setScreen("top");
      return;
    }

    setAnswers((prev) => prev.slice(0, -1));
    setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <main className="app">

      <div className="decoration decoration-1">♡</div>
      <div className="decoration decoration-2">✦</div>
      <div className="decoration decoration-3">♡</div>
      <div className="decoration decoration-4">⋆</div>

      {screen === "top" && (
        <section className="top-screen">
          <div className="brand">
            <p className="brand-jp">絶 対 少 女</p>
            <p className="brand-en">OSHI FINDER</p>
          </div>

          <div className="heart">♡</div>

          <div className="hero">
            <p className="hero-small">
              あなたの<span>「好き」</span>から
            </p>

            <h1>
              運命の推しを
              <br />
              見つけませんか？
            </h1>

            <p className="hero-description">
              まだ絶対少女を知らなくても大丈夫。
              <br />
              あなたの「好き」から、
              <br />
              ハマりそうな女の子を探します。
            </p>
          </div>

          <button
            className="start-button"
            onClick={startDiagnosis}
          >
            診断をはじめる <span>♡</span>
          </button>

          <p className="time">全10問 / 約2分</p>

          <p className="unofficial">
            UNOFFICIAL FAN PROJECT
          </p>
        </section>
      )}

      {screen === "question" && (
  <QuestionScreen
    question={questions[currentQuestion]}
    currentIndex={currentQuestion}
    totalQuestions={questions.length}
    onAnswer={handleAnswer}
    onBack={handleBack}
  />
)}

{/* 👇ここを追加！ */}
{screen === "analyzing" && (
  <AnalyzingScreen
    onComplete={() => setScreen("result")}
  />
)}

{screen === "result" && (
  <ResultScreen
    result={result}
    sessionId={sessionId}
    onFeedback={saveFeedback}
    onRetry={() => {
      setResult(null);
      setAnswers([]);
      setCurrentQuestion(0);
      setSessionId(null);
      setIsSubmitting(false);
      setScreen("top");
    }}
  />
)}
    </main>
  );
}

export default App;