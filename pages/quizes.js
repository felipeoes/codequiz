/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function QuizesPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/felipeoes" />
    </QuizBackground>
  );
}
