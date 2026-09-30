export const memberIds = [
  "yuru",
  "china",
  "yumenya",
  "memei",
  "unya",
  "riri",
  "sayupi",
  "cocoa",
];

export function calculateResult(answers) {
  const scores = Object.fromEntries(
    memberIds.map((member) => [member, 0])
  );

  answers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([member, point]) => {
      scores[member] += point;
    });
  });

  const ranking = Object.entries(scores)
    .map(([member, score]) => ({
      member,
      score,
    }))
    .sort((a, b) => b.score - a.score);

  return {
    scores,
    ranking,
    top3: ranking.slice(0, 3),
  };
}