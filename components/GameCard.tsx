import Link from 'next/link';

type GameCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function GameCard({ title, description, href }: GameCardProps) {
  return (
    <Link
      href={href}
      className="block border border-gray-200 rounded-lg p-5 hover:border-gray-400 hover:shadow-sm hover:scale-105 transition"
    >
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}