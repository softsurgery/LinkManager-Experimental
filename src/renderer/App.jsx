import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FolderDrawer } from "./components/Explorer/FolderDrawer";
import { FolderContent } from "./components/Explorer/FolderContent";
import { AddDialog } from "./components/AddDialog";
import { getAllCategories } from "./electron";

function App() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [{ icon: <AddIcon />, name: "Add Category", callback: handleOpen }];


  const fetchCategories = () => {
    getAllCategories().then((res) => {
      console.log("res: ", res);
      setCategories(res);
    });
  };


  return (
    <>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <FolderDrawer categories={categories} />,
        },
        {
          path: "/category/:id",
          element: <FolderContent />,
        },
      ])} />
      <AddDialog handleClose={handleClose} open={open} refresh={fetch} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.callback}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default App;
