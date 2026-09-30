import { useState } from "react";
import { members } from "../data/members";

function ResultScreen({
  result,
  sessionId,
  onFeedback,
  onRetry,
}) {
  const [reaction, setReaction] = useState("");
  const [interestedMember, setInterestedMember] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!result) return null;

  const [first, second, third] = result.top3;

  const firstMember = members[first.member];
  const secondMember = members[second.member];
  const thirdMember = members[third.member];

  const handleFeedback = async () => {
    if (
      !reaction ||
      !interestedMember ||
      !sessionId ||
      sending
    ) {
      return;
    }

    setSending(true);

    const success = await onFeedback(
      sessionId,
      reaction,
      interestedMember
    );

    if (success) {
      setFeedbackSent(true);
    }

    setSending(false);
  };

  return (
    <section className="result-screen">

      <p className="result-label">
        YOUR OSHI MATCH ♡
      </p>

      <p className="result-small">
        あなたと一番相性がよさそうなのは…
      </p>

      <div className="result-heart">♡</div>

      <h1 className="result-member">
        {firstMember.name}
      </h1>

      <p className="result-catchphrase">
        {firstMember.catchphrase}
      </p>

      <div className="result-description">
        <p className="result-section-label">
          WHY YOU MATCH
        </p>

        <h2>
          あなたが惹かれそうな理由 ♡
        </h2>

        <p>
          {firstMember.description}
        </p>
      </div>

      <div className="result-points">
        <p className="result-section-label">
          CHECK POINT
        </p>

        <h2>
          この子のここに注目
        </h2>

        <div className="point-list">
          {firstMember.points.map((point, index) => (
            <div className="point-card" key={point}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{point}</p>

              <small>♡</small>
            </div>
          ))}
        </div>
      </div>

      <div className="sub-ranking">
        <p className="result-section-label">
          NEXT MATCH
        </p>

        <p className="sub-title">
          こんな子も気になるかも
        </p>

        <div className="sub-members">
          <div>
            <span>02</span>
            <strong>{secondMember.name}</strong>
          </div>

          <div>
            <span>03</span>
            <strong>{thirdMember.name}</strong>
          </div>
        </div>
      </div>

      <div className="feedback-box">
        {!feedbackSent ? (
          <>
            <p className="result-section-label">
              YOUR FEEDBACK
            </p>

            <h2>
              診断結果どうだった？♡
            </h2>

            <div className="reaction-buttons">
              <button
                className={
                  reaction === "match"
                    ? "selected"
                    : ""
                }
                onClick={() => setReaction("match")}
              >
                めっちゃわかる ♡
              </button>

              <button
                className={
                  reaction === "surprise"
                    ? "selected"
                    : ""
                }
                onClick={() => setReaction("surprise")}
              >
                意外かも！
              </button>
            </div>

            <p className="feedback-question">
              診断をして、一番気になった子は？
            </p>

            <div className="member-select">
              {Object.entries(members).map(
                ([id, member]) => (
                  <button
                    key={id}
                    className={
                      interestedMember === id
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setInterestedMember(id)
                    }
                  >
                    {member.shortName}
                  </button>
                )
              )}
            </div>

            <button
              className="feedback-submit"
              disabled={
                !reaction ||
                !interestedMember ||
                !sessionId ||
                sending
              }
              onClick={handleFeedback}
            >
              {sending
                ? "送信中..."
                : "回答する ♡"}
            </button>
          </>
        ) : (
          <div className="feedback-thanks">
            <span>♡</span>

            <h2>回答ありがとう！</h2>

            <p>
              みんなの回答をもとに、
              <br />
              診断をもっと育てていきます。
            </p>
          </div>
        )}
      </div>

      <button
        className="retry-button"
        onClick={onRetry}
      >
        もう一度診断する ♡
      </button>

      <p className="unofficial result-unofficial">
        UNOFFICIAL FAN PROJECT
      </p>

    </section>
  );
}

export default ResultScreen;