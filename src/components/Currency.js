import { useEffect, useState } from "react";
import {
  Icon,
  Button,
  Modal,
  Dropdown,
  Input,
  Statistic,
} from "semantic-ui-react";
import DataTable from "./DataTable";
import LoaderExampleLoader from "./Loader";
import GetRequest from "../services/getRequest";

const Currency = () => {
  //states
  const [row, setRow] = useState([]);
  const [clickedInfo, setClickedInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [chosenCurrency, setChosenCurrency] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [calculatedCurrency, setCalculatedCurrency] = useState(null);

  useEffect(() => {
    if (clickedInfo.rates) {
      let data = Object.keys(clickedInfo.rates).map((key, index) => {
        return {
          text: key,
          key: index,
          value: clickedInfo.rates[key],
        };
      });
      setDropdownData(data);
    }
  }, [clickedInfo]);

  const handleOpenModal = (row) => {
    GetRequest(
      `https://api.coinbase.com/v2/exchange-rates?currency=${row.id}`
    ).then((res) => {
      setClickedInfo(res.data.data);
      setIsModalOpen(true);
    });
  };

  const columns = [
    {
      value: "name",
    },
    {
      value: "id",
    },
    {
      value: "Actions",
      cellRenderer(row, rowIndex, column, columnIndex) {
        return (
          <Button
            onClick={() => {
              handleOpenModal(row);
            }}
          >
            <Icon name="info circle" />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    GetRequest("https://api.coinbase.com/v2/currencies").then((res) => {
      setRow(res.data.data);
      setIsLoaded(true);
    });
  }, []);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleCalculateCurrency = () => {
    if (inputValue && chosenCurrency) {
      let result = inputValue * chosenCurrency.value;
      setCalculatedCurrency(result.toFixed(3));
    }
  };

  const handleOK = () => {
    setIsModalOpen(false);
    setCalculatedCurrency(null);
    setChosenCurrency(null);
    setInputValue(null);
  };

  const onDropdownChange = (text, value) => {
    setChosenCurrency({ text: text, value: value });
  };

  return (
    <div>
      {isLoaded && <DataTable columns={columns} data={row} pageSize={30} />}
      {!isLoaded && <LoaderExampleLoader />}
      {isModalOpen && (
        <Modal
          onClose={() => handleOK()}
          onOpen={() => setIsModalOpen(true)}
          open={isModalOpen}
        >
          <Modal.Header>
            Detailed Information about {clickedInfo.currency}
          </Modal.Header>
          <Modal.Content>
            <div>
              {clickedInfo.currency}
              <Input
                type="number"
                placeholder={`enter ${clickedInfo.currency} amount`}
                onChange={(e, { value }) => handleInputChange(value)}
              ></Input>
              <Dropdown
                placeholder="Select Currency"
                search
                selection
                options={dropdownData}
                onChange={(e, { value }) =>
                  onDropdownChange(e.target.innerText, value)
                }
              ></Dropdown>
              <Button primary onClick={handleCalculateCurrency}>
                Calculate
              </Button>
              <Statistic style={{ marginLeft: "60px" }}>
                <Statistic.Value>{calculatedCurrency}</Statistic.Value>
                <Statistic.Label>
                  {calculatedCurrency ? chosenCurrency.text : ""}
                </Statistic.Label>
              </Statistic>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" icon="checkmark" onClick={handleOK}>
              OK
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default Currency;
