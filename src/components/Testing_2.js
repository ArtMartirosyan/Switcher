import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../config/Config";
import DataTable from "./DataTable";

const Testing_2 = () => {
  const [data, setData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const [newData, setNewData] = useState([]);
  console.log("data", data);
  console.log(("newData", newData));
  const fetchData = () => {
    axios.get("https://randomuser.me/api/?results=20").then((res) => {
      setData(
        res.data.results.map((item) => {
          return Object.keys(item).map((key) => {
            return { [key]: func(item, key) };
          });
        })
      );
      setDataReceived(true);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNewData(
      data.map((row) => {
        return row.reduce((value, acc) => {
          debugger;
          acc = { ...value, ...acc };
          return acc;
        }, {});
      })
    );
  }, [data]);

  const func = (item, key) => {
    const indx = Config.findIndex((el) => el.value === key);
    if (indx !== -1) {
      return Config[indx].stringBuilder(item[key]);
    }
    return "";
  };

  return (
    <div>
      <h1>Testing</h1>
      {dataReceived && (
        <DataTable data={newData} columns={Config} pageSize={7} />
      )}
    </div>
  );
};

export default Testing_2;
