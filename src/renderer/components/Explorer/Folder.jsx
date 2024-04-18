import FolderIcon from "@mui/icons-material/Folder";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Folder = ({ style, id, name, color, clicked, handleClick }) => {
  const navigate = useNavigate();
  return (
    <div
      id={id}
      style={{
        ...style,
        textAlign: "center",
        cursor: "pointer",
        margin: "10px",
        backgroundColor: clicked ? "lightblue" : "transparent",
      }}
      onClick={() => handleClick(id)}
      onDoubleClick={() => navigate("/category/" + id)}
    >
      <FolderIcon
        sx={{
          fontSize: 100,
          color: color,
        }}
      />
      <Typography style={{ fontWeight: "800", color: color }}>
        {name}
      </Typography>
    </div>
  );
};

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  clicked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};