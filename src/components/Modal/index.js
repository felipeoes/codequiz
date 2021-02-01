/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-overlays/Modal';
import Button from '../Button';
import ResultWidget from '../../screens/Quiz/myindex';

const rand = () => Math.floor(Math.random() * 20) - 10;

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
  width: 50%;
  height: 50%;
  z-index: 1040;
  margin-left: 100;
  top: 150;
  left: 150; 
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export default function ModalExample() {
  const [show, setShow] = React.useState(false);

  const renderBackdrop = (props) => <Backdrop {...props} />;

  return (
    <div className="modal-example">
      <Button
        style={{ marginTop: 10 }}
        onClick={() => setShow(true)}
      >
        VER RANKING
      </Button>

      <RandomlyPositionedModal
        style={{ marginLeft: '25%', marginTop: '10%' }}
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
      >
        <div>
          <h4 id="modal-label">Text in a modal</h4>
          <p style={{ color: '#000' }}>
            Duis mollis, est non commodo luctus, nisi erat
            porttitor ligula.
          </p>
          {/* <ModalExample /> */}
        </div>
        <ResultWidget />
      </RandomlyPositionedModal>
    </div>
  );
}
