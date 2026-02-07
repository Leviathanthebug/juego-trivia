"use client";

import { Question } from '@/types';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  isLastQuestion: boolean;
}

export default function QuestionCard({ question, onAnswer, isLastQuestion }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const isCorrect = answer === question.respuestaCorrecta;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">{question.DescripcionPregunta}</h3>
      
      <div className="space-y-4">
        <button
          onClick={() => handleAnswer(true)}
          disabled={isAnswered}
          className={`w-full p-4 text-left rounded-lg transition ${
            selectedAnswer === true
              ? question.respuestaCorrecta === true
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          } ${isAnswered && selectedAnswer !== true && question.respuestaCorrecta === true ? 'bg-green-500 text-white' : ''}`}
        >
          Verdadero
        </button>
        
        <button
          onClick={() => handleAnswer(false)}
          disabled={isAnswered}
          className={`w-full p-4 text-left rounded-lg transition ${
            selectedAnswer === false
              ? question.respuestaCorrecta === false
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          } ${isAnswered && selectedAnswer !== false && question.respuestaCorrecta === false ? 'bg-green-500 text-white' : ''}`}
        >
          Falso
        </button>
      </div>
      
      {isAnswered && (
        <div className="mt-6">
          <p className={`text-lg font-semibold mb-4 ${selectedAnswer === question.respuestaCorrecta ? 'text-green-600' : 'text-red-600'}`}>
            {selectedAnswer === question.respuestaCorrecta ? 'Correcto :)' : 'Incorrecto :('}
          </p>
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta'}
          </button>
        </div>
      )}
    </div>
  );
}