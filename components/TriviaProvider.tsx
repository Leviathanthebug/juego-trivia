"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface TriviaContextType {
  score: number;
  answeredQuestions: number;
  incrementScore: (points: number) => void;
  resetGame: () => void;
}

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

export function TriviaProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const incrementScore = (points: number) => {
    setScore(score + points);
    setAnsweredQuestions(answeredQuestions + 1);
  };

  const resetGame = () => {
    setScore(0);
    setAnsweredQuestions(0);
  };

  return (
    <TriviaContext.Provider value={{ 
      score, 
      answeredQuestions, 
      incrementScore, 
      resetGame 
    }}>
      {children}
    </TriviaContext.Provider>
  );
}

export function useTrivia() {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error('useTrivia debe usarse dentro de TriviaProvider');
  }
  return context;
}