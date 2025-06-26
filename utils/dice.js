// ダイス処理ユーティリティ

export function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

export function rollMultipleD100(times) {
  const results = [];
  for (let i = 0; i < times; i++) {
    results.push(rollD100());
  }
  return results;
}

export function countSuccess(results, threshold) {
  return results.filter(roll => roll <= threshold).length;
}
