import { useState } from "react";
import { styled } from "styled-components";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import { Autocomplete, Box, TextField, Stack } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import { Navbar } from "../Common/Navbar";
import { AddFolderDialog } from "./AddFolderDialog";
import { Folder } from "./Folder";
import categoryModel from "../../model/Categories";

const Explorer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

export const FolderDrawer = observer(({ style }) => {
  const [clickedId, setClickedId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <AddIcon />, name: "Add Category", callback: handleOpen },
    { icon: <FileDownloadIcon />, name: "Import From JSON/CSV", callback: handleOpen },
    { icon: <FileUploadIcon />, name: "Export To JSON/CSV", callback: handleOpen }
  ];

  const search = categoryModel.categories.map((category) => ({
    title: category.title,
  }));

  return (
    <Stack spacing={2} style={style}>
      <Navbar isRoot={true} />
      <Autocomplete
        id="free-solo"
        freeSolo
        options={search.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Search" />}
        style={{ margin: "20px" }}
      />
      <Explorer>
        {categoryModel.categories.map((category) => {
          return (
            <Folder
              key={category.id}
              id={category.id}
              name={category.title}
              color={category.color}
              clicked={clickedId === category.id}
              handleClick={(id) => {
                setClickedId(id);
              }}
            />
          );
        })}
      </Explorer>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <SpeedDial ariaLabel="SpeedDial" icon={<AddReactionIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.callback}
            />
          ))}
        </SpeedDial>
        <AddFolderDialog open={open} handleClose={handleClose} />
      </Box>
    </Stack>
  );
});

FolderDrawer.propTypes = {
  style: PropTypes.object,
};
