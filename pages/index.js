/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
// eslint-disable-next-line import/no-named-as-default
import { QuizLogoIndex } from '../src/components/QuizLogo';

const MainWidget = styled.div`
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 10px 8px 11px 2px rgba(20, 5, 21, 0.75);
    opacity: 0.9;
  }
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
  transition: .3s;
  h1, h2, h3 {
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
  }
`;

// eslint-disable-next-line import/no-mutable-exports
export let getName = '';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // eslint-disable-next-line no-const-assign
  getName = name;
  return (
    <QuizBackground backgroundImage={db.bg}>
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
        <QuizLogoIndex />
        <MainWidget
          as={motion.section}
          transition={{ delay: 0, duration: 0.7 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz aí seu nome"
                value={name}
              />
              <p disabled={name.length === 0} data-tip data-for="info">
                <ReactTooltip id="info" type="light" place="top" effect="solid">
                  <span disabled={name.length === 0}>Digite seu nome para liberar o jogo</span>
                </ReactTooltip>
                <Button type="submit" disabled={name.length === 0}>
                  {`Bora jogar ${name}!`}
                </Button>
              </p>
            </form>
          </Widget.Content>
        </MainWidget>

        <MainWidget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.7 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quizzes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Que tal se aventurar com diversos outros quizzes que a galera desenvolveu?</p>
            <Button
              disabled={name.length === 0}
              onClick={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push('/quizes');
              }}
            >
              Ver quizzes
            </Button>
          </Widget.Content>
        </MainWidget>

        <Footer
          as={motion.footer}
          transition={{ delay: 0.3, duration: 0.7 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/felipeoes" />
    </QuizBackground>
  );
}
