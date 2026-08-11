import GameCard from '@/components/GameCard';

const GAMES = [
  { title: 'Crossword', description: 'Fill the grid, crack the clues.', href: '/games/crossword' },
  { title: 'Word Search', description: 'Find the hidden words.', href: '/games/wordsearch' },
  { title: 'Sudoku', description: 'Numbers, logic, no repeats.', href: '/games/sudoku' },
  { title: 'Wordle', description: 'Guess the five-letter word.', href: '/games/wordle' },
  { title: 'Scrabble', description: 'Build the highest-scoring word.', href: '/games/scrabble' },
  { title: 'Hangman', description: 'Guess before the drawing completes.', href: '/games/hangman' },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-1">Ignite</h1>
      <p className="text-gray-500 mb-8">Six games, one platform. Pick one to start.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {GAMES.map((g) => (
          <GameCard key={g.href} {...g} />
        ))}
      </div>
    </main>
  );
}