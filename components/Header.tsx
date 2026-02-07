"use client";

import { useTrivia } from './TriviaProvider';
import Link from 'next/link';

export default function Header() {
  const { score } = useTrivia();

  return (
    <header style={{ 
      backgroundColor: '#FFAAB8', 
      color: 'white', 
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>
        Trivia App
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#F57799', padding: '8px 16px', borderRadius: '5px' }}>
          Puntaje: <strong>{score}</strong>
        </div>
        
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Jugar
          </Link>
          <Link href="/results" style={{ color: 'white', textDecoration: 'none' }}>
            Resultados
          </Link>
        </nav>
      </div>
    </header>
  );
}