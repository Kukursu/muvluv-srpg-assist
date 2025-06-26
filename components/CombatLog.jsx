import React from 'react';

export default function CombatLog({ log }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(log.join('\n'));
  };

  return (
    <div className="bg-gray-100 p-3 rounded mt-4">
      <h2 className="font-semibold mb-2">戦闘ログ：</h2>
      <button
        onClick={handleCopy}
        className="mb-2 px-3 py-1 bg-green-600 text-white rounded"
      >
        📋 コピー
      </button>
      <div className="whitespace-pre-wrap">
        {log.map((line, idx) => <p key={idx}>{line}</p>)}
      </div>
    </div>
  );
}
