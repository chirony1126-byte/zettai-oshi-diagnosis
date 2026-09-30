function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onBack,
}) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <section className="question-screen">
      <header className="question-header">
        <div className="question-brand">
          <span>絶 対 少 女</span>
          <small>OSHI FINDER</small>
        </div>

        <span className="question-count">
          {String(currentIndex + 1).padStart(2, "0")}
          <span>/</span>
          {String(totalQuestions).padStart(2, "0")}
        </span>
      </header>

      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-content">
        <p className="question-number">
          QUESTION {String(currentIndex + 1).padStart(2, "0")}
        </p>

        <h2>{question.question}</h2>

        <div className="answer-list">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              className="answer-card"
              onClick={() => onAnswer(answer)}
            >
              <span className="answer-letter">{answer.id}</span>
              <span className="answer-text">{answer.text}</span>
              <span className="answer-heart">♡</span>
            </button>
          ))}
        </div>

        {currentIndex > 0 && (
          <button className="back-button" onClick={onBack}>
            ‹ BACK
          </button>
        )}
      </div>
    </section>
  );
}

export default QuestionScreen;