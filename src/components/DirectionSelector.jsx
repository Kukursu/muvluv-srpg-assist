import React from 'react';

export default function DirectionSelector({ direction, onChange }) {
  return (
    <div>
      <label className="font-semibold">被弾方向：</label>
      <select
        value={direction}
        onChange={e => onChange(e.target.value)}
        className="ml-2 p-1 border rounded"
      >
        <option value="front">前方（装甲強）</option>
        <option value="back">後方（装甲薄）</option>
        <option value="left">左</option>
        <option value="right">右</option>
      </select>
    </div>
  );
}
