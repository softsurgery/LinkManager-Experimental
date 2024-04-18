import { useParams } from "react-router-dom";
import React from "react";
import { Navbar } from "../Common/Navbar";
import { LinkItem } from "./Link/LinkItem";
import { getLinksByCategoryId, getCategory } from "../../electron";
import styled from "styled-components";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const FolderTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-decoration: underline;
`;

const Content = styled.h2`
  font-size: 1.5rem;
`;

export const FolderContent = () => {
  const { id } = useParams();
  const [list, setList] = React.useState([]);
  const [category, setCategory] = React.useState({});

  const fetchCategory = () => {
    getCategory(id).then((res) => {
      console.log("res: ", res);
      setCategory(res);
    });
  };

  const fetchLinks = () => {
    getLinksByCategoryId(id).then((res) => {
      console.log("res: ", res);
      setList(res);
    });
  };

  React.useEffect(() => {
    fetchCategory();
    fetchLinks();
  }, []);

  return (
    <div>
      <Navbar isRoot={false} />
      <div style={{ margin: "1rem" }}>
        <FolderTitle style={{ color: category.color }}>{category.title}</FolderTitle>

        {list.length > 0? (
          <div>
            <Content>Content :</Content>
            {list.map((link) => (
              <div key={link.id} style={{ display: "flex", alignItems: "center" }}>
                <InsertLinkIcon style={{ marginRight: "1rem" }} />
                <LinkItem key={link.id} name={link.title} url={link.url} />
              </div>
            ))}
          </div>
        ) : (
          <Content>Empty Folder</Content>
        )}
      </div>
    </div>
  );
};

