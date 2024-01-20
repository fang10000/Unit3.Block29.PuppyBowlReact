import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const PlayerDetailButton = ({ player, onDetailsClick }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => () => {
    setDrawerOpen(!isDrawerOpen);
    onDetailsClick(player);
  };

  return (
    <>
      {/* Render a button */}
      <IconButton onClick={toggleDrawer(true)}>
        <InfoIcon />
      </IconButton>

      {/* Render the drawer */}
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {/* Content inside the drawer */}
          <ListItem>
            <ListItemText primary="Player Details" />
          </ListItem>
          <ListItem>
            {/* Render the selected player details */}
            <ListItemText primary={`Name: ${player.name}`} />
            <ListItemText primary={`Breed: ${player.breed}`} />
            <ListItemText primary={`Team Id: ${player.teamId}`} />
            <ListItemText primary={`Cohort Id: ${player.cohortId}`} />
            {/* Add more details as needed */}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default PlayerDetailButton;
