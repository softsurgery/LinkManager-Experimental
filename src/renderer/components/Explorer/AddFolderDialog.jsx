import { useState } from "react";
import { Box,Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TwitterPicker } from 'react-color';
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import categoryModel from "../../model/Categories";

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

export const AddFolderDialog = observer(({ open, handleClose}) => {
  const [folderTitle, setFolderTitle] = useState("Folder");
  const [folderColor, setFolderColor] = useState("#000");

  const handleColorChange = (color) => {
    setFolderColor(color.hex);
  };

  const handleSubmit = () => {
    if (folderTitle) {
      categoryModel.createCategory({ title: folderTitle, color: folderColor });
      handleClose();
      setFolderTitle("");
      setFolderColor("#000");
      categoryModel.fetchCategories();
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
          <Button variant="outlined" color="error" onClick={onClose} style={{ margin: "0.5rem" }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
})

AddFolderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
