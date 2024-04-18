import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { createCategory, deleteCategory, getAllCategories } from "./electron";

const SqlDemo = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState();

  const fetch = () => {
    getAllCategories().then((res) => {
      console.log("res: ", res);
      setList(res);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <div>
        <Input
          value={keyword}
          onChange={(e) => {
            console.log("e: ", e);
            const value = e?.target?.value;
            setKeyword(value);
          }}
          placeholder="Please enter content"
        />
        <Button
          type="primary"
          onClick={() => {
            if (keyword)
              createCategory({ title: keyword }).then(() => {
                console.log("Added successfully!: ");
                setKeyword();
                fetch();
              });
          }}
        >
          Add
        </Button>
      </div>

      {list.map((e) => {
        return (
          <div key={e.id}>
            <div>{e.title}</div>
            <Button
              onClick={() => {
                deleteCategory(e.id).then(() => {
                  fetch();
                });
              }}
              danger
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SqlDemo;
