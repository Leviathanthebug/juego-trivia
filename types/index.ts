export interface Question {
  idPreguntas: string;
  DescripcionPregunta: string;
  opcionRespuesta1: boolean;
  opcionRespuesta2: boolean;
  respuestaCorrecta: boolean;
  puntajePregunta: number;
}

export interface TriviaContextType {
  score: number;
  answeredQuestions: number;
  incrementScore: (points: number) => void;
  resetGame: () => void;
}