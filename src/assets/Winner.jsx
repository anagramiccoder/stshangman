import { useState } from 'react';
import PersonalModal from './Modal';

function Winner(props) {

  return (
    <PersonalModal open={props.open}>
        WINNER
        <button onClick={props.next}> Next</button>
    </PersonalModal>
  );
}

export default Winner;