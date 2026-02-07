"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTrivia } from '@/components/TriviaProvider';

type Question = {
  idPreguntas: string;
  DescripcionPregunta: string;
  opcionRespuesta1: boolean;
  opcionRespuesta2: boolean;
  respuestaCorrecta: boolean;
  puntajePregunta: number;
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string>('');
  const { incrementScore } = useTrivia();

  useEffect(() => {
    const preguntasSimuladas: Question[] = [
      {
        idPreguntas: "1",
        DescripcionPregunta: "El sol es una estrella",
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: true,
        puntajePregunta: 1
      },
      {
        idPreguntas: "2",
        DescripcionPregunta: "2 + 2 = 5",
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: false,
        puntajePregunta: 1
      },
      {
        idPreguntas: "3",
        DescripcionPregunta: "El agua es seca",
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: false,
        puntajePregunta: 1
      },
      {
        idPreguntas: "4",
        DescripcionPregunta: "El agua hierve a 100°C",
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: true,
        puntajePregunta: 1
      },
      {
        idPreguntas: "5",
        DescripcionPregunta: "La luna es más grande que la tierra",
        opcionRespuesta1: true,
        opcionRespuesta2: false,
        respuestaCorrecta: false,
        puntajePregunta: 1
      }
    ];
    
    setQuestions(preguntasSimuladas.slice(0, 5));
  }, []);

  const handleAnswer = (answer: boolean) => {
    if (isAnswered) return;
    
    const isCorrect = answer === questions[currentQuestionIndex].respuestaCorrecta;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (isCorrect) {
      setShowFeedback('Correcto');
      incrementScore(questions[currentQuestionIndex].puntajePregunta);
    } else {
      setShowFeedback('Incorrecto');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowFeedback('');
    }
  };

  if (questions.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando preguntas.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Trivia</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Pregunta {currentQuestionIndex + 1} de {questions.length}
      </p>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '25px', 
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ fontSize: '22px', marginBottom: '25px' }}>
          {currentQuestion.DescripcionPregunta}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => handleAnswer(true)}
            disabled={isAnswered}
            style={{ 
              padding: '15px',
              fontSize: '16px',
              backgroundColor: selectedAnswer === true 
                ? (currentQuestion.respuestaCorrecta === true ? '#4CAF50' : '#f44336')
                : '#e0e0e0',
              color: selectedAnswer === true ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: isAnswered ? 'default' : 'pointer'
            }}
          >
            Verdadero
          </button>
          
          <button 
            onClick={() => handleAnswer(false)}
            disabled={isAnswered}
            style={{ 
              padding: '15px',
              fontSize: '16px',
              backgroundColor: selectedAnswer === false 
                ? (currentQuestion.respuestaCorrecta === false ? '#4CAF50' : '#f44336')
                : '#e0e0e0',
              color: selectedAnswer === false ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: isAnswered ? 'default' : 'pointer'
            }}
          >
            Falso
          </button>
        </div>
      </div>
      
      {showFeedback && (
        <div style={{ 
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: showFeedback.includes('Correcto') ? '#4CAF50' : '#f44336',
            marginBottom: '20px'
          }}>
            {showFeedback}
          </p>
          
          {!isLastQuestion ? (
            <button 
              onClick={nextQuestion}
              style={{ 
                padding: '12px 30px',
                fontSize: '16px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Siguiente Pregunta
            </button>
          ) : (
            <Link href="/results">
              <button 
                style={{ 
                  padding: '12px 30px',
                  fontSize: '16px',
                  backgroundColor: '#FF0087',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Ver Resultados
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}