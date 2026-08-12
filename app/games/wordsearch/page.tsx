'use client';

import { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const WORD_BANK = [
  'REACT', 'NEXTJS', 'TYPESCRIPT', 'TAILWIND', 'SUPABASE',
  'COMMIT', 'BRANCH', 'MERGE', 'ISSUE', 'DEPLOY',
  'VERCEL', 'GITHUB', 'DEBUG', 'ARRAY', 'CROSSWORD',
];

const SIZE = 12;
const DIRECTIONS = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

const COLORS = ['#bbf7d0', '#bfdbfe', '#fde68a', '#fbcfe8', '#c7d2fe', '#fecaca', '#a7f3d0', '#ddd6fe'];

type Placement = { word: string; cells: [number, number][] };

function emptyGrid(): string[][] {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(''));
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function tryPlace(grid: string[][], word: string): [number, number][] | null {
  for (let attempt = 0; attempt < 150; attempt++) {
    const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    const maxRow = dr === 1 ? SIZE - word.length : dr === -1 ? word.length - 1 : SIZE - 1;
    const minRow = dr === -1 ? word.length - 1 : 0;
    const maxCol = dc === 1 ? SIZE - word.length : dc === -1 ? word.length - 1 : SIZE - 1;
    const minCol = dc === -1 ? word.length - 1 : 0;

    const row = minRow + Math.floor(Math.random() * (maxRow - minRow + 1));
    const col = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));

    const cells: [number, number][] = [];
    let valid = true;
    for (let i = 0; i < word.length; i++) {
      const r = row + dr * i, c = col + dc * i;
      if (!inBounds(r, c)) { valid = false; break; }
      const existing = grid[r][c];
      if (existing !== '' && existing !== word[i]) { valid = false; break; }
      cells.push([r, c]);
    }
    if (valid) {
      cells.forEach(([r, c], i) => { grid[r][c] = word[i]; });
      return cells;
    }
  }
  return null;
}

function generatePuzzle() {
  const grid = emptyGrid();
  const words = [...WORD_BANK].sort(() => Math.random() - 0.5).slice(0, 8).sort((a, b) => b.length - a.length);
  const placements: Placement[] = [];
  for (const word of words) {
    const cells = tryPlace(grid, word);
    if (cells) placements.push({ word, cells });
  }
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === '') grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return { grid, placements };
}

function cellsMatch(a: [number, number][], b: [number, number][]) {
  if (a.length !== b.length) return false;
  const forward = a.every(([r, c], i) => r === b[i][0] && c === b[i][1]);
  const backward = a.every(([r, c], i) => r === b[b.length - 1 - i][0] && c === b[b.length - 1 - i][1]);
  return forward || backward;
}

export default function WordSearchPage() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Record<string, string>>({});
  const [start, setStart] = useState<[number, number] | null>(null);

  const newPuzzle = useCallback(() => {
    const { grid, placements } = generatePuzzle();
    setGrid(grid);
    setPlacements(placements);
    setFoundWords(new Set());
    setFoundCells({});
    setStart(null);
  }, []);

  useState(() => { newPuzzle(); });

  function buildLine(r1: number, c1: number, r2: number, c2: number): [number, number][] | null {
    const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1);
    if (r1 === r2 && c1 === c2) return [[r1, c1]];
    if (dr !== 0 && dc !== 0 && Math.abs(r2 - r1) !== Math.abs(c2 - c1)) return null;
    if (dr === 0 && dc === 0) return null;

    const cells: [number, number][] = [];
    let r = r1, c = c1;
    while (true) {
      cells.push([r, c]);
      if (r === r2 && c === c2) break;
      r += dr; c += dc;
      if (!inBounds(r, c)) return null;
      if (cells.length > SIZE) return null;
    }
    return cells;
  }

  function handleCellClick(r: number, c: number) {
    if (!start) {
      setStart([r, c]);
      return;
    }

    const line = buildLine(start[0], start[1], r, c);
    setStart(null);

    if (!line) return;

    for (const p of placements) {
      if (foundWords.has(p.word)) continue;
      if (cellsMatch(p.cells, line)) {
        setFoundWords(prev => new Set(prev).add(p.word));
        const color = COLORS[foundWords.size % COLORS.length];
        setFoundCells(prev => {
          const next = { ...prev };
          p.cells.forEach(([cr, cc]) => { next[`${cr}-${cc}`] = color; });
          return next;
        });
        return;
      }
    }
  }

  const allFound = placements.length > 0 && foundWords.size === placements.length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className={allFound ? 'text-green-600 font-medium text-sm' : 'text-gray-500 text-sm'}>
          {allFound ? 'All words found! Nicely done.' : 'Click the first letter, then the last letter of a word'}
        </p>
        <button onClick={newPuzzle} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
          <RefreshCw size={16} /> New puzzle
        </button>
      </div>

      <div className="flex gap-6 flex-wrap">
        <div
          className="inline-grid gap-0.5 select-none"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 28px)`, gridTemplateRows: `repeat(${SIZE}, 28px)` }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const isStart = start && start[0] === r && start[1] === c;
              const bg = foundCells[`${r}-${c}`] ?? (isStart ? '#e5e7eb' : 'white');
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className="border border-gray-300 flex items-center justify-center text-sm font-medium text-black uppercase"
                  style={{ background: bg }}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>

        <div className="min-w-[150px]">
          <div className="text-sm font-medium text-gray-500 mb-1">Find these words</div>
          {placements.map(p => (
            <div
              key={p.word}
              className={`text-sm ${foundWords.has(p.word) ? 'line-through text-gray-400' : 'text-white'}`}
            >
              {p.word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}