import PropTypes from "prop-types";
import { openExternally } from "../../../electron";

export const LinkItem = ({ name, url }) => {

  
  return (
    <div>
      <a
        onClick={() => {
          openExternally(url);
        }}
        target="_blank"
        rel="noreferrer noopener"
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "blue",
        }}
      >
        {name}
      </a>
    </div>
  );
};

LinkItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
