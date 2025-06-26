import React from 'react';

export default function EvasionSelector({ evasionMode, onChange }) {
  return (
    <div>
      <label className="font-semibold">回避モード：</label>
      <select
        value={evasionMode}
        onChange={e => onChange(e.target.value)}
        className="ml-2 p-1 border rounded"
      >
        <option value="normal">通常（回避率60%）</option>
        <option value="focus">回避専念（回避率80%）</option>
      </select>
    </div>
  );
}
