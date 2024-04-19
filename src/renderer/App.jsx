import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FolderDrawer } from "./components/Explorer/FolderDrawer";
import { FolderContent } from "./components/Explorer/FolderContent";
import categoryModel from "./model/Categories";
import { observer } from "mobx-react";

const App = observer(() => {

  React.useEffect(() => {
    categoryModel.fetchCategories();
  }, []);

  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <FolderDrawer />
          },
          {
            path: "/category/:id",
            element: <FolderContent />,
          },
        ])}
      />
    </>
  );
})

export default App;
