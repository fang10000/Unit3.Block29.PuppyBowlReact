import React, { useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component for further processing
    onAddPlayer(formData);
    // Clear the form after submission
    setFormData({
      name: '',
      breed: '',
      imageUrl: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-player-form">
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Breed"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        required
      />
      <TextField
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />
      <IconButton type="submit">
        <AddIcon />
      </IconButton>
    </form>
  );
};

export default AddPlayerForm;
