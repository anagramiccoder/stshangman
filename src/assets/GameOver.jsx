import { useState } from 'react';
import PersonalModal from './Modal';

function GameOver(props) {

  return (
    <PersonalModal open={props.open}>
        GAME OVER<br/>
        <button onClick={()=>{location.reload()}}> Play Again</button>
    </PersonalModal>
  );
}

export default GameOver;