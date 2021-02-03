import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 10px;
  margin: auto 7%;
  padding-bottom: 0;
  @media screen and (max-width: 500px) {
    margin: auto;
    width: 85%;
    padding: 15px;
  }
`;

export default QuizContainer;
