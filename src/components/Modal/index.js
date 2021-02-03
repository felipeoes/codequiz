/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-overlays/Modal';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../Button';
import Widget from '../Widget';
import { getName } from '../../../pages/index';
import { points } from '../../screens/Quiz/myindex';

const ResponsiveWidgetContent = styled.div`
padding: 24px 32px 24px 32px;
& > *:first-child {
  margin-top: 0;
}
& > *:last-child {
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}
@media screen and (max-width: 500px) {
    margin-left: -10%; 
  }
`;

function ResultWidget({ handleOnClose }) {
  return (
    <Widget style={{
      margin: 0, width: '100%', height: '100%',
    }}
    >
      <Widget.Header style={{ paddingTop: 5, paddingBottom: 0 }}>
        RANKING
        <Button
          onClick={handleOnClose}
        >
          <div style={{ marginLeft: '95%', marginRight: '-25%' }}>
            <Image
              src="/closeButton.png"
              alt="CloseButton"
              width={20}
              height={20}
            />
          </div>
        </Button>
      </Widget.Header>

      <ResponsiveWidgetContent>
        <p style={{
          textAlign: 'center', alignItems: 'center', fontSize: 15,
        }}
        >
          Parabéns,
          {' '}
          {getName}
          !
          {' '}
          {' '}
        </p>
        <section
          style={{
            marginLeft: 50, marginTop: 20, textAlign: 'center', alignItems: 'center', fontSize: 14,
          }}
        >

          <table style={{ background: '#dd3333', borderRadius: 3 }}>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#000', borderRadius: 5 }}>
                <th>1</th>
                <th>&nbsp;Demogorgon&nbsp;</th>
                <th>9999</th>
              </tr>
            </tbody>
            <tbody>
              <tr style={{ background: '#000', borderRadius: 5 }}>
                <th>2</th>
                <th>{getName}</th>
                <th>{points}</th>
              </tr>
            </tbody>
          </table>
        </section>
      </ResponsiveWidgetContent>
    </Widget>
  );
}

const Backdrop = styled('div')`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 35%;
  z-index: 1040;
  outline: none;
  margin-left: 35%; 
  margin-top: 10%;
  @media screen and (max-width: 500px) {
    /* margin: auto; */
    width: 100%;
    height: 40%;
    padding: 10px;
    margin-left: 0.5%; 
    margin-top: 45%;
  }
`;

export default function ModalExample() {
  const [show, setShow] = React.useState(false);
  const renderBackdrop = (props) => <Backdrop {...props} />;

  function handleOnClose() {
    setShow(false);
  }

  return (
    <div className="modal-example">
      <Button
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ marginTop: 10 }}
        onClick={() => setShow(true)}
      >
        VER RANKING
      </Button>

      <RandomlyPositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div style={{
          padding: 0, margin: 0, width: '100%', height: '100%',
        }}
        >
          <ResultWidget handleOnClose={handleOnClose} />
        </div>
      </RandomlyPositionedModal>
    </div>
  );
}
