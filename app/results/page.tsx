"use client";

import { useTrivia } from '@/components/TriviaProvider';
import Link from 'next/link';

export default function ResultsPage() {
  const { score, answeredQuestions, resetGame } = useTrivia();

  const handleRestart = () => {
    resetGame();
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Resultados</h1>
      
      <div style={{ 
        backgroundColor: '#FFD8DF',
        padding: '30px', 
        margin: '20px auto',
        maxWidth: '400px',
        border: '2px solid #ccc',
        borderRadius: '10px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Tu puntaje:</h2>
        <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#F57799', margin: '20px 0' }}>
          {score}
        </div>
        
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          <strong>Preguntas respondidas:</strong> {answeredQuestions}
        </p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          <strong>Preguntas totales:</strong> 5
        </p>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <Link href="/">
          <button 
            onClick={handleRestart}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Jugar Otra Vez
          </button>
        </Link>
        
        <Link href="/">
          <button 
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
}