import { useState } from "react";
import { styled } from "styled-components";
import { Folder } from "./Folder";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Navbar } from "../Common/Navbar";



const Explorer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

export const FolderDrawer = ({ style, categories }) => {
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (id) => {
    setClickedId(id);
  };

  const search = categories.map((category) => ({
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
        {categories.map((category) => {
          return (
            <Folder
              key={category.id}
              id={category.id}
              name={category.title}
              color={category.color}
              clicked={clickedId === category.id}
              handleClick={handleClick}
            />
          );
        })}
      </Explorer>
    </Stack>
  );
};

FolderDrawer.propTypes = {
  style: PropTypes.object,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
