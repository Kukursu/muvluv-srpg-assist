import React from 'react';

export default function WeaponSelector({ weapons, selectedWeapon, onChange }) {
  return (
    <div>
      <label className="font-semibold">武器選択：</label>
      <select
        value={selectedWeapon}
        onChange={e => onChange(e.target.value)}
        className="ml-2 p-1 border rounded"
      >
        {Object.keys(weapons).map((weaponKey) => (
          <option key={weaponKey} value={weaponKey}>
            {weapons[weaponKey].name}（命中{weapons[weaponKey].hitRate}％／DMG{weapons[weaponKey].damage}）
          </option>
        ))}
      </select>
    </div>
  );
}
