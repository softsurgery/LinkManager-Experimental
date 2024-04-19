import { useParams } from "react-router-dom";
import React from "react";
import { Navbar } from "../Common/Navbar";
import { LinkItem } from "./Link/LinkItem";
import styled from "styled-components";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { observer } from "mobx-react";
import categoryModel from "../../model/Categories";
import linkModel from "../../model/Links";

const FolderTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-decoration: underline;
`;

const Content = styled.h2`
  font-size: 1.5rem;
`;

export const FolderContent = observer(() => {
  const { id } = useParams();

  React.useEffect(() => {
    categoryModel.getCategory(id);
    linkModel.fetchLinksByCategoryId(id);
  }, [id]);

  return (
    <div>
      <Navbar isRoot={false} />
      <div style={{ margin: "1rem" }}>
        {categoryModel.selectedCategory ? (
          <FolderTitle style={{ color: categoryModel.selectedCategory.color }}>
            {categoryModel.selectedCategory.title}
          </FolderTitle>
        ) : null}
        {linkModel.links.length > 0 ? (
          <div>
            <Content>Content :</Content>
            {linkModel.links.map((link) => (
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
});
