'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const WORD_BANK = [
  'REACT', 'TYPESCRIPT', 'TAILWIND', 'SUPABASE', 'GITHUB',
  'COMMIT', 'BRANCH', 'MERGE', 'DEPLOY', 'DEBUG',
  'VERCEL', 'JAVASCRIPT', 'COMPONENT', 'FUNCTION', 'VARIABLE',
];

const MAX_WRONG = 6;
const QWERTY = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

const STAGES = [
  '  +---+\n      |\n      |\n      |\n     ===',
  '  +---+\n  O   |\n      |\n      |\n     ===',
  '  +---+\n  O   |\n  |   |\n      |\n     ===',
  '  +---+\n  O   |\n /|   |\n      |\n     ===',
  '  +---+\n  O   |\n /|\\  |\n      |\n     ===',
  '  +---+\n  O   |\n /|\\  |\n /    |\n     ===',
  '  +---+\n  O   |\n /|\\  |\n / \\  |\n     ===',
];

export default function HangmanPage() {
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const newGame = useCallback(() => {
    setWord(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
    setGuessed(new Set());
    setWrongCount(0);
    setStatus('playing');
  }, []);

  useEffect(() => { newGame(); }, [newGame]);

  const handleGuess = useCallback((letter: string) => {
    if (status !== 'playing' || guessed.has(letter)) return;

    const nextGuessed = new Set(guessed).add(letter);
    setGuessed(nextGuessed);

    if (!word.includes(letter)) {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      if (nextWrong >= MAX_WRONG) setStatus('lost');
    } else {
      const allRevealed = word.split('').every(l => nextGuessed.has(l));
      if (allRevealed) setStatus('won');
    }
  }, [status, guessed, word, wrongCount]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) handleGuess(key);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleGuess]);

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {status === 'won' && 'Solved! Nicely done.'}
          {status === 'lost' && `Out of guesses. The word was ${word}.`}
          {status === 'playing' && `${MAX_WRONG - wrongCount} guesses left`}
        </p>
        <button onClick={newGame} className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm">
          <RefreshCw size={16} /> New word
        </button>
      </div>

      <pre className="text-white text-sm leading-tight mb-6 font-mono bg-gray-900 p-4 rounded">
        {STAGES[wrongCount]}
      </pre>

      <div className="flex gap-2 mb-8 bg-gray-900 px-4 py-3 rounded">
        {word.split('').map((letter, i) => (
          <div key={i} className="w-8 h-10 border-b-2 border-white flex items-center justify-center">
            <span className="text-lg font-bold text-white uppercase">
              {guessed.has(letter) || status === 'lost' ? letter : ''}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 w-full">
        {QWERTY.map(letter => {
          const isGuessed = guessed.has(letter);
          const isCorrect = isGuessed && word.includes(letter);
          const isWrong = isGuessed && !word.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || status !== 'playing'}
              className="h-10 rounded text-sm font-semibold uppercase flex items-center justify-center disabled:opacity-50"
              style={{
                background: isCorrect ? '#22c55e' : isWrong ? '#ef4444' : '#e5e7eb',
                color: isCorrect || isWrong ? 'white' : 'black',
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}