'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Check, Eye } from 'lucide-react';

const BASE = 3;
const SIDE = 9;

function pattern(r: number, c: number) {
  return (BASE * (r % BASE) + Math.floor(r / BASE) + c) % SIDE;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateSolvedGrid(): number[][] {
  const rBase = [0, 1, 2];
  const rows = shuffle(rBase).flatMap(g => shuffle(rBase).map(r => g * BASE + r));
  const cols = shuffle(rBase).flatMap(g => shuffle(rBase).map(c => g * BASE + c));
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return rows.map(r => cols.map(c => nums[pattern(r, c)]));
}

function makePuzzle(solution: number[][], holes = 45) {
  const given = Array.from({ length: SIDE }, () => Array(SIDE).fill(true));
  let removed = 0;
  while (removed < holes) {
    const r = Math.floor(Math.random() * SIDE);
    const c = Math.floor(Math.random() * SIDE);
    if (given[r][c]) {
      given[r][c] = false;
      removed++;
    }
  }
  return given;
}

export default function SudokuPage() {
  const [solution, setSolution] = useState<number[][]>([]);
  const [given, setGiven] = useState<boolean[][]>([]);
  const [userGrid, setUserGrid] = useState<(number | null)[][]>([]);
  const [feedback, setFeedback] = useState<('correct' | 'wrong' | null)[][]>([]);
  const [solved, setSolved] = useState(false);

  const newPuzzle = useCallback(() => {
    const sol = generateSolvedGrid();
    const givenMask = makePuzzle(sol);
    setSolution(sol);
    setGiven(givenMask);
    setUserGrid(sol.map((row, r) => row.map((val, c) => (givenMask[r][c] ? val : null))));
    setFeedback(Array.from({ length: SIDE }, () => Array(SIDE).fill(null)));
    setSolved(false);
  }, []);

  useEffect(() => { newPuzzle(); }, [newPuzzle]);

  useEffect(() => {
    if (!solution.length) return;
    const complete = userGrid.every((row, r) => row.every((val, c) => val === solution[r][c]));
    setSolved(complete);
  }, [userGrid, solution]);

  function handleInput(r: number, c: number, raw: string) {
    if (given[r][c]) return;
    const digit = raw.replace(/[^1-9]/, '');
    setUserGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = digit ? parseInt(digit) : null;
      return next;
    });
    setFeedback(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = null;
      return next;
    });
  }

  function handleCheck() {
    const next = userGrid.map((row, r) =>
      row.map((val, c) => {
        if (given[r][c] || val === null) return null;
        return val === solution[r][c] ? ('correct' as const) : ('wrong' as const);
      })
    );
    setFeedback(next);
  }

  function handleReveal() {
    setUserGrid(solution.map(row => [...row]));
    setFeedback(Array.from({ length: SIDE }, () => Array(SIDE).fill(null)));
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className={solved ? 'text-green-600 font-medium text-sm' : 'text-gray-500 text-sm'}>
          {solved ? 'Solved! Nicely done.' : 'Fill in the grid'}
        </p>
        <div className="flex gap-2">
          <button onClick={handleCheck} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
            <Check size={16} /> Check
          </button>
          <button onClick={handleReveal} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
            <Eye size={16} /> Reveal
          </button>
          <button onClick={newPuzzle} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
            <RefreshCw size={16} /> New puzzle
          </button>
        </div>
      </div>

      <div
        className="inline-grid border-2 border-gray-800"
        style={{ gridTemplateColumns: 'repeat(9, 36px)', gridTemplateRows: 'repeat(9, 36px)' }}
      >
        {userGrid.map((row, r) =>
          row.map((val, c) => {
            const isGiven = given[r]?.[c];
            const fb = feedback[r]?.[c];
            const borderRight = (c + 1) % 3 === 0 && c !== 8 ? '2px solid #1f2937' : '1px solid #d1d5db';
            const borderBottom = (r + 1) % 3 === 0 && r !== 8 ? '2px solid #1f2937' : '1px solid #d1d5db';
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  borderRight,
                  borderBottom,
                  background: fb === 'correct' ? '#dcfce7' : fb === 'wrong' ? '#fee2e2' : isGiven ? '#f3f4f6' : 'white',
                }}
                className="flex items-center justify-center"
              >
                {isGiven ? (
                  <span className="text-sm font-semibold text-black">{val}</span>
                ) : (
                  <input
                    maxLength={1}
                    value={val ?? ''}
                    onChange={e => handleInput(r, c, e.target.value)}
                    className="w-full h-full text-center text-sm font-medium text-black bg-transparent outline-none"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}