/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 10px;
  margin: auto 7%;
  padding-bottom: 0;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

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
        <meta property="og:image" content="db.bg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codequiz.felipeoes.vercel.app/" />
        <meta property="twitter:title" content="Quiz Stranger Things" />
        <meta property="twitter:description" content="Teste os seus conhecimentos sobre Stranger Things e vamos ver se você vai acabar parando no mundo invertido" />
        <meta property="twitter:image" content="" />
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
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
              <Button type="submit" disabled={name.length === 0}>
                {`Bora jogar ${name}!`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Que tal se aventurar com diversos outros quizes que a galera desenvolveu?</p>
            <Button
              onClick={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push('/quizes');
              }}
            >
              Ver quizes
            </Button>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/felipeoes" />
    </QuizBackground>
  );
}
