import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const PlayerDeleteButton = ({ playerId, onDeleteSuccess }) => {
  const handleDeletePlayer = async () => {
    try {
      // Make an API request to delete the player
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-UNF-HY-WEB-PT/players/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle successful deletion
        onDeleteSuccess(playerId);
        console.log(`Player with ID ${playerId} deleted successfully`);
      } else {
        // Handle error
        console.error(`Error deleting player with ID ${playerId}`);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error during delete operation', error);
    }
  };

  return (
    <>
      {/* Render a button */}
      <IconButton onClick={handleDeletePlayer}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </>
  );
};

export default PlayerDeleteButton;