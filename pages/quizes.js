/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function QuizesPage() {
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
        <QuizLogo />
        <Widget
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
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/felipeoes" />
    </QuizBackground>
  );
}
