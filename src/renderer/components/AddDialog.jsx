import { useState } from "react";
import { Box,Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TwitterPicker } from 'react-color';
import { createCategory } from "../electron";
import PropTypes from "prop-types";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0068d3',
  borderRadius: "1rem",
  boxShadow: 50,
  p: 4,
};

export const AddDialog = ({ open, handleClose, refresh }) => {
  const [folderTitle, setFolderTitle] = useState("Folder");
  const [folderColor, setFolderColor] = useState("#000");

  const handleColorChange = (color) => {
    setFolderColor(color.hex);
  };

  const handleSubmit = () => {
    if (folderTitle) {
      createCategory({ title: folderTitle, color: folderColor });
      handleClose();
      setFolderTitle("");
      setFolderColor("#000");
      refresh();
    }
  };

  const onClose = () => {
      handleClose();
      setFolderTitle("Folder");
      setFolderColor("#000");
  }

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} style={{ textAlign: "center" }}>
          <TextField
            label="Folder Title"
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            fullWidth
            margin="normal"
            error={!folderTitle}
          />
          <div style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
            <TwitterPicker
              color={folderColor}
              onChangeComplete={(color) => handleColorChange(color)}
            />
          </div>

          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: "0.5rem" }}>
            Add Folder
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ margin: "0.5rem" }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};