const memberNames = {
  yuru: "苺 ﾕﾙ",
  china: "白宙夢 ﾁﾅ",
  yumenya: "葡萄 ﾕﾒﾆｬ",
  memei: "恋檬水 ﾒﾒｲ",
  unya: "藍苺 ｳﾆｬ",
  riri: "愛音 ﾘﾘ",
  sayupi: "桜桃 ｻﾕﾋ°",
  cocoa: "杏守 ｺｺｱ",
};

function ResultScreen({ result, onRetry }) {
  if (!result) return null;

  const [first, second, third] = result.top3;

  return (
    <section className="result-screen">
      <p className="result-label">YOUR OSHI MATCH ♡</p>

      <p className="result-small">
        あなたと一番相性がよさそうなのは…
      </p>

      <div className="result-heart">♡</div>

      <h1 className="result-member">
        {memberNames[first.member]}
      </h1>

      <p className="result-message">
        あなたの「好き」に
        <br />
        いちばん近い女の子です。
      </p>

      <div className="sub-ranking">
        <p className="sub-title">
          こんな子も気になるかも
        </p>

        <div className="sub-members">
          <div>
            <span>02</span>
            <strong>{memberNames[second.member]}</strong>
          </div>

          <div>
            <span>03</span>
            <strong>{memberNames[third.member]}</strong>
          </div>
        </div>
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