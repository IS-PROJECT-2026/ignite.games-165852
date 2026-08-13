'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const WORD_LIST = [
  'REACT', 'BUILD', 'BRAVE', 'CLOUD', 'DEBUG',
  'FETCH', 'GRAPH', 'HOVER', 'INPUT', 'LEARN',
  'MERGE', 'PATCH', 'QUERY', 'SOLVE', 'STACK',
  'STYLE', 'THEME', 'TOKEN', 'VALID', 'WRITE',
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type LetterState = 'correct' | 'present' | 'absent' | null;

function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill('absent');
  const answerLetters = answer.split('');
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answerLetters[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    const idx = answerLetters.findIndex((l, j) => l === guess[i] && !used[j]);
    if (idx !== -1) {
      result[i] = 'present';
      used[idx] = true;
    }
  }
  return result;
}

const COLORS: Record<Exclude<LetterState, null>, string> = {
  correct: '#22c55e',
  present: '#eab308',
  absent: '#9ca3af',
};

export default function WordlePage() {
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState('');

  const newGame = useCallback(() => {
    setAnswer(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
    setGuesses([]);
    setCurrent('');
    setStatus('playing');
    setMessage('');
  }, []);

  useEffect(() => { newGame(); }, [newGame]);

  const handleKey = useCallback((key: string) => {
    if (status !== 'playing') return;

    if (key === 'ENTER') {
      if (current.length !== WORD_LENGTH) {
        setMessage('Not enough letters');
        setTimeout(() => setMessage(''), 1500);
        return;
      }
      if (!WORD_LIST.includes(current)) {
        setMessage('Not in word list');
        setTimeout(() => setMessage(''), 1500);
        return;
      }
      const nextGuesses = [...guesses, current];
      setGuesses(nextGuesses);
      if (current === answer) {
        setStatus('won');
      } else if (nextGuesses.length >= MAX_GUESSES) {
        setStatus('lost');
      }
      setCurrent('');
      return;
    }

    if (key === 'BACKSPACE') {
      setCurrent(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(prev => prev + key);
    }
  }, [current, guesses, answer, status]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toUpperCase();
      if (key === 'ENTER') handleKey('ENTER');
      else if (key === 'BACKSPACE') handleKey('BACKSPACE');
      else if (/^[A-Z]$/.test(key)) handleKey(key);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) return { letters: guesses[i].split(''), states: evaluateGuess(guesses[i], answer) };
    if (i === guesses.length) return { letters: current.split(''), states: Array(WORD_LENGTH).fill(null) as LetterState[] };
    return { letters: [], states: Array(WORD_LENGTH).fill(null) as LetterState[] };
  });

  const keyboardRows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', ...'ZXCVBNM'.split(''), 'BACKSPACE'],
  ];

  const keyState: Record<string, LetterState> = {};
  guesses.forEach(g => {
    evaluateGuess(g, answer).forEach((state, i) => {
      const letter = g[i];
      const rank = { correct: 3, present: 2, absent: 1, null: 0 } as const;
      if (!keyState[letter] || rank[state as keyof typeof rank] > rank[keyState[letter] as keyof typeof rank]) {
        keyState[letter] = state;
      }
    });
  });

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {status === 'won' && 'Solved! Nicely done.'}
          {status === 'lost' && `Out of guesses. The word was ${answer}.`}
          {status === 'playing' && (message || 'Guess the 5-letter word')}
        </p>
        <button onClick={newGame} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
          <RefreshCw size={16} /> New word
        </button>
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        {rows.map((row, r) => (
          <div key={r} className="flex gap-1.5">
            {Array.from({ length: WORD_LENGTH }).map((_, c) => {
              const letter = row.letters[c] ?? '';
              const state = row.states[c];
              return (
                <div
                  key={c}
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold uppercase border-2 rounded"
                  style={{
                    background: state ? COLORS[state] : 'white',
                    color: state ? 'white' : 'black',
                    borderColor: state ? COLORS[state] : letter ? '#9ca3af' : '#d1d5db',
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.map(key => {
              const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
              const state = keyState[key];
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className={`h-11 rounded text-xs font-semibold uppercase flex items-center justify-center ${isSpecial ? 'px-2 min-w-[48px]' : 'w-8'}`}
                  style={{
                    background: state ? COLORS[state] : '#e5e7eb',
                    color: state ? 'white' : 'black',
                  }}
                >
                  {key === 'BACKSPACE' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}