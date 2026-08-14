'use client';

import { useState, useCallback } from 'react';
import { RefreshCw, Check } from 'lucide-react';

const TILE_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
};

const LETTER_POOL = Object.entries(TILE_VALUES).flatMap(([letter, value]) => {
  const counts: Record<string, number> = {
    A: 9, E: 12, I: 9, O: 8, U: 4, L: 4, N: 6, S: 4, T: 6, R: 6,
    D: 4, G: 3, B: 2, C: 2, M: 2, P: 2, F: 2, H: 2, V: 2, W: 2, Y: 2,
    K: 1, J: 1, X: 1, Q: 1, Z: 1,
  };
  return Array(counts[letter] ?? 1).fill(letter);
});

function drawTiles(count: number, exclude: string[] = []): string[] {
  const pool = [...LETTER_POOL];
  const drawn: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    drawn.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return drawn;
}

const BOARD_SIZE = 9;

export default function ScrabblePage() {
  const [rack, setRack] = useState<string[]>(() => drawTiles(7));
  const [board, setBoard] = useState<(string | null)[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  );
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [lastWordScore, setLastWordScore] = useState<number | null>(null);

  const newGame = useCallback(() => {
    setRack(drawTiles(7));
    setBoard(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)));
    setSelectedTile(null);
    setScore(0);
    setLastWordScore(null);
  }, []);

  function handleRackClick(index: number) {
    setSelectedTile(prev => (prev === index ? null : index));
  }

  function handleCellClick(r: number, c: number) {
    if (selectedTile === null) return;
    if (board[r][c] !== null) return;

    const letter = rack[selectedTile];
    setBoard(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = letter;
      return next;
    });
    setRack(prev => prev.filter((_, i) => i !== selectedTile));
    setSelectedTile(null);
  }

  function extractWords(): string[] {
    const words: string[] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      let current = '';
      for (let c = 0; c < BOARD_SIZE; c++) {
        const letter = board[r][c];
        if (letter) current += letter;
        else {
          if (current.length > 1) words.push(current);
          current = '';
        }
      }
      if (current.length > 1) words.push(current);
    }
    for (let c = 0; c < BOARD_SIZE; c++) {
      let current = '';
      for (let r = 0; r < BOARD_SIZE; r++) {
        const letter = board[r][c];
        if (letter) current += letter;
        else {
          if (current.length > 1) words.push(current);
          current = '';
        }
      }
      if (current.length > 1) words.push(current);
    }
    return words;
  }

  function handleScoreWords() {
    const words = extractWords();
    const total = words.reduce(
      (sum, word) => sum + word.split('').reduce((s, l) => s + (TILE_VALUES[l] ?? 0), 0),
      0
    );
    setScore(prev => prev + total);
    setLastWordScore(total);

    const tilesUsed = words.join('').length;
    if (rack.length < 7) {
      setRack(prev => [...prev, ...drawTiles(7 - prev.length)]);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Score: <span className="font-semibold text-black">{score}</span>
          {lastWordScore !== null && ` (+${lastWordScore} last placement)`}
        </p>
        <button onClick={newGame} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
          <RefreshCw size={16} /> New game
        </button>
      </div>

      <div
        className="inline-grid border-2 border-gray-800 mb-4"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 36px)`, gridTemplateRows: `repeat(${BOARD_SIZE}, 36px)` }}
      >
        {board.map((row, r) =>
          row.map((letter, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className="border border-gray-300 flex items-center justify-center relative"
              style={{ background: letter ? '#fde68a' : 'white' }}
            >
              {letter && (
                <>
                  <span className="text-sm font-bold text-black">{letter}</span>
                  <span className="absolute bottom-0 right-0.5 text-[8px] text-gray-600">
                    {TILE_VALUES[letter]}
                  </span>
                </>
              )}
            </button>
          ))
        )}
      </div>

      <button
        onClick={handleScoreWords}
        className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded text-sm mb-6"
      >
        <Check size={16} /> Score placed words
      </button>

      <div className="text-sm text-gray-500 mb-2">Your tiles — click one, then click a board square</div>
      <div className="flex gap-2">
        {rack.map((letter, i) => (
          <button
            key={i}
            onClick={() => handleRackClick(i)}
            className="w-10 h-10 rounded flex items-center justify-center relative border-2"
            style={{
              background: '#fef3c7',
              borderColor: selectedTile === i ? '#1f2937' : '#fde68a',
            }}
          >
            <span className="text-base font-bold text-black">{letter}</span>
            <span className="absolute bottom-0 right-0.5 text-[8px] text-gray-600">
              {TILE_VALUES[letter]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}