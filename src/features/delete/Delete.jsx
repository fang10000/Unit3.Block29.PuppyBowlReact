import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const PlayerDeleteButton = ({ playerId, onDeleteSuccess }) => {
    return (
      <IconButton onClick={() => onDeleteSuccess(playerId)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    );
  };
  
  export default PlayerDeleteButton;