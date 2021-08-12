import axios from "axios";
import { Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Config from "../config/Config";

const Testing = () => {
  const [data, setData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  console.log("data", data);
  const fetchData = () => {
    axios.get("https://randomuser.me/api/?results=20").then((res) => {
      setData(res.data.results);
      setDataReceived(true);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        <Table>
          <Table.Header>
            <Table.Row>
              {Config.map((obj) => {
                return <Table.HeaderCell>{obj.value}</Table.HeaderCell>;
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item) => {
              return (
                <Table.Row>
                  {Object.keys(item).map((key) => {
                    return <Table.Cell>{func(item, key)}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default Testing;
