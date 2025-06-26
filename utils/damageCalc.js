// ダメージ計算ロジック

export function calculateDamagePerHit(weaponDamage, armor) {
  return Math.max(0, weaponDamage - armor);
}

export function calculateTotalDamage(perHitDamage, hitCount) {
  return perHitDamage * hitCount;
}

export function applyDamageToHP(currentHP, damage) {
  return Math.max(0, currentHP - damage);
}
