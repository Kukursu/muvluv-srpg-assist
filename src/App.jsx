import React, { useState, useEffect } from 'react';
import weapons from './data/weapons.json';
import units from './data/units.json';
import { rollD100, rollMultipleD100, countSuccess } from './utils/dice';
import { calculateDamagePerHit, calculateTotalDamage, applyDamageToHP } from './utils/damageCalc';
import WeaponSelector from './components/WeaponSelector';
import DirectionSelector from './components/DirectionSelector';
import EvasionSelector from './components/EvasionSelector';
import CombatLog from './components/CombatLog';
import HitPartSelector from './components/HitPartSelector';

export default function App() {
  const [attacker] = useState('激震');
  const [target] = useState('BETA中型');
  const [weapon, setWeapon] = useState('36㎜チェーンガン');
  const [direction, setDirection] = useState('front');
  const [evasionMode, setEvasionMode] = useState('normal');
  const [hitPart, setHitPart] = useState('torso');
  const [log, setLog] = useState([]);
  const [targetHP, setTargetHP] = useState(0);

  useEffect(() => {
    const initial = units[attacker]?.partsHP?.[hitPart] ?? 0;
    setTargetHP(initial);
  }, [attacker, hitPart]);

  const handleAttack = () => {
    const weaponData = weapons[weapon];
    const unitData = units[attacker];
    const baseHit = weaponData.hitRate;
    const attackRoll = rollD100();
    const hit = attackRoll <= baseHit;

    const newLog = [`⚔️ [${attacker}]の攻撃 → [${target}]！`,
      `　┗ 使用武器：${weapon}（命中率：${baseHit}%）`,
      `🎯 命中部位：${hitPart}`,
      `🎲 命中判定 → ${attackRoll} → ${hit ? '成功！' : '失敗…'}\n`];

    if (!hit) {
      setLog(newLog);
      return;
    }

    const evasionRate = evasionMode === 'normal' ? 60 : 80;
    const evasionRolls = rollMultipleD100(5);
    const successCount = countSuccess(evasionRolls, evasionRate);
    const hits = 5 - successCount;

    const directionArmor = unitData.armor[direction];
    const partArmor = unitData.partsArmor[hitPart];
    const effectiveArmor = Math.floor((directionArmor + partArmor) / 2);
    const perHit = calculateDamagePerHit(weaponData.damage, effectiveArmor);
    const total = calculateTotalDamage(perHit, hits);
    const newHP = applyDamageToHP(targetHP, total);

    newLog.push(`🌀 [${target}]は回避（回避率${evasionRate}%）を選択`);
    newLog.push(`🎲 回避判定：${evasionRolls.join(', ')} → ${successCount}回成功 → ${hits}ヒット！`);
    newLog.push(`💥 ダメージ処理：`);
    newLog.push(`　命中方向：${direction} → 装甲（方向＋部位）：${directionArmor}＋${partArmor}`);
    newLog.push(`　1ヒットあたり：${perHit} × ${hits} = ${total}`);
    newLog.push(`　${hitPart}残HP：${newHP}／${unitData.partsHP[hitPart]} → ${newHP <= 10 ? '⚠️機能低下！' : '正常稼働'}`);

    setTargetHP(newHP);
    setLog(newLog);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">SRPG支援：App⑵（外部データ＆部品構造）</h1>

      <WeaponSelector
        weapons={weapons}
        selectedWeapon={weapon}
        onChange={setWeapon}
      />

      <DirectionSelector
        direction={direction}
        onChange={setDirection}
      />

      <EvasionSelector
        evasionMode={evasionMode}
        onChange={setEvasionMode}
      />

      <HitPartSelector
        hitPart={hitPart}
        onChange={setHitPart}
      />

      <button onClick={handleAttack} className="px-4 py-2 bg-blue-600 text-white rounded">攻撃実行！</button>

      <CombatLog log={log} />
    </div>
  );
}
