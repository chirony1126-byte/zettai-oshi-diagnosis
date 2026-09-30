import { useEffect } from "react";

function AnalyzingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="analyzing-screen">
      <div className="syrup-orbit">
        <span className="drop drop-1" />
        <span className="drop drop-2" />
        <span className="drop drop-3" />
        <span className="drop drop-4" />
        <span className="drop drop-5" />
        <span className="drop drop-6" />
        <span className="drop drop-7" />
        <span className="drop drop-8" />

        <div className="mix-heart">♡</div>
      </div>

      <p className="analyzing-en">
        SYRUP MATCHING...
      </p>

      <h2>
        あなたの「好き」を
        <br />
        混ぜています ♡
      </h2>

      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

export default AnalyzingScreen;