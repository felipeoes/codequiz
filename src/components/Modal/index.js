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
// import { ResultWidget } from '../../screens/Quiz/myindex';

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
          <div style={{ marginLeft: '95%', marginRight: -250 }}>
            <Image
              src="/closeButton.png"
              alt="CloseButton"
              width={20}
              height={20}
            />
          </div>
        </Button>
      </Widget.Header>

      <Widget.Content>
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
                <th>{getName}</th>
                <th>{points}</th>
              </tr>
            </tbody>
          </table>
        </section>
      </Widget.Content>
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

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  width: 30%;
  height: 30%;
  z-index: 1040;
  /* margin-left: 100; */
  /* top: 150;
  left: 150;  */
  /* border: 5px solid '##dd3333'; */
  /* background-color: white; */
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); */
  /* padding: 20px; */
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
        style={{ marginLeft: '35%', marginTop: '10%', outline: 'none' }}
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
