
import React from 'react';

const UndoDeleteButton = ({ handleUndoDelete }) => {
  return (
    <div>
      <button onClick={handleUndoDelete}>Undo Last Delete</button>
    </div>
  );
};

export default UndoDeleteButton;
