/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { Lottie } from '@crello/react-lottie';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import { getName } from '../../../pages/index';
import db from '../../../db.json';
import Modal from '../../components/Modal';
import GitHubCorner from '../../components/GitHubCorner';
import loadingAnimation from './animations/load.json';
import success from './animations/success.json';
import wrong from './animations/wrong.json';

export function ResultWidget({ results }) {
  const router = useRouter();
  return (
    <Widget
      as={motion.footer}
      transition={{ delay: 0.3, duration: 0.7 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
      style={{ marginTop: 50 }}
    >
      <Widget.Header>
        RESULTADO
      </Widget.Header>

      <Widget.Content>
        <p
          style={{ fontSize: 15 }}
        >
          Parabéns,
          {' '}
          {getName}
          {' ! '}
          {' '}
        </p>
        Você acertou
        {' '}
        {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
        {results.filter((x) => x).length}
        {' '}
        perguntas
        <p
          style={{ fontSize: 15 }}
        />
        <ul
          style={{ justifyContent: 'center', alignItems: 'center', fontSize: 14 }}
        >
          {results.map((result, index) => (
            <li
              // style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
              key={`result__${index}`}
            >
              #
              {index + 1}
              {' '}
              Pergunta:
              {result === true
                ? (
                  <Lottie
                    width="20%"
                    height="20%"
                    margin-left="0"
                    padding-left="0"
                    className="lottie-container basic"
                    config={{ animationData: success, loop: true, autoplay: true }}
                  />
                )
                : (
                  <Lottie
                    width="20%"
                    height="20%"
                    margin-left="0"
                    padding-left="0"
                    className="lottie-container basic"
                    config={{ animationData: wrong, loop: true, autoplay: true }}
                  />
                )}
            </li>
          ))}
        </ul>
        <Button
          onClick={function (infosDoEvento) {
            infosDoEvento.preventDefault();
            router.push('/');
          }}
        >
          VOLTAR
        </Button>
        <Modal />
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget
      as={motion.div}
      transition={{ delay: 0, duration: 0.2 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="300px"
          height="230px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget
      as={motion.footer}
      transition={{ delay: 0.5, duration: 0.7 }}
      variants={{
        show: { opacity: 1, x: '0' },
        hidden: { opacity: 0, x: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content
        as={motion.div}
      >
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
            <div style={{ marginTop: -350, marginBottom: '21.5%', overlay: 'hidden' }}>
              <Lottie
                width="100%"
                height="100%"
                className="lottie-container basic"
                config={{ animationData: success, loop: true, autoplay: true }}
              />
            </div>
          )}
          {isQuestionSubmited && !isCorrect && (
            <div style={{ marginTop: -300, marginBottom: '14%', overlay: 'hidden' }}>
              <Lottie
                width="90%"
                height="90%"
                className="lottie-container basic"
                config={{ animationData: wrong, loop: true, autoplay: true }}
              />
            </div>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
      }, 1 * 1000);
    } else {
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 1 * 1000);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <Head>
        <meta name="title" content="Quiz Stranger Things" />
        <meta name="description" content="Teste os seus conhecimentos sobre Stranger Things e vamos ver se você vai acabar parando no mundo invertido" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codequiz.felipeoes.vercel.app/" />
        <meta property="og:title" content="Quiz Stranger Things" />
        <meta property="og:description" content="Teste os seus conhecimentos sobre Stranger Things e vamos ver se você vai acabar parando no mundo invertido" />
        <meta property="og:image" content="https://i.ibb.co/LJXFBwQ/bgImage.png?resize=1530%2C1220&ssl=1" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codequiz.felipeoes.vercel.app/" />
        <meta property="twitter:title" content="Quiz Stranger Things" />
        <meta property="twitter:description" content="Teste os seus conhecimentos sobre Stranger Things e vamos ver se você vai acabar parando no mundo invertido" />
        <meta property="twitter:image" content="https://i.ibb.co/LJXFBwQ/bgImage.png?resize=1530%2C1220&ssl=1" />
        <title>{db.title}</title>

        <link rel="icon" href="https://lh3.googleusercontent.com/proxy/lTNC5esOwgrxYVEks7wdiVZbkS_-cGIi84l1zvz_CVP_PUa9zIsCqz6_PZD1g5Rk8VF3HaC8jtVyWSzRUuDNA__3GBBsu66Dg9smg4fIOoyl0g" />

      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
