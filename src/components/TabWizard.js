import { useEffect, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import Modal from "./Modal";

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function chunk(array, num) {
  let result = [];
  for (let i = num; i <= array.length + num - 1; i += num) {
    result = [...result, [...array.slice(i - num, i)]];
  }
  return result;
}

function fill(arr, val, start, end) {
  let result = arr.map((item, index) => {
    if (start <= index && index < end) {
      return val;
    } else {
      return item;
    }
  });
  return result;
}

function intersection(arr1, arr2) {
  let res = [];
  arr1.forEach((item) => {
    arr2.map((num) => {
      if (item === num && !res.includes(num)) {
        res.push(num);
      }
    });
  });
  return res;
}

function trim(value) {
  let arr = Array.from(value);
  let res = arr.filter((char) => {
    return char !== " " && char !== "-" && char !== "_" && char !== "";
  });
  return res.join("");
}

//Validations
function validateCardNumber(cardNumber) {
  const re =
    /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  return re.test(cardNumber);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateLetters(value) {
  return /^[a-zA-Z]+$/.test(value);
}

function validateAddress(address) {
  const re = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  return re.test(address);
}

function validateAge(age) {
  return /^\d*$/.test(age);
}

const TabWizard = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [completedTabs, setCompletedTabs] = useState([]);
  const [isInputInvalid, setIsInputInvalid] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      activeTabId === 3 &&
      cardNumber &&
      operatingSystem &&
      !completedTabs.includes(activeTabId) &&
      isInputInvalid.length === 0
    ) {
      setCompletedTabs([...completedTabs, activeTabId]);
    }
  }, [activeTabId, cardNumber, completedTabs, operatingSystem]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cleanFromInvalidInput = (name) => {
    let temp = isInputInvalid.filter((input) => {
      return input !== name;
    });
    setIsInputInvalid([...temp]);
  };

  const InputValueSetter = {
    firstName: setFirstName,
    lastName: setLastName,
    email: setEmail,
    address: setAddress,
    age: setAge,
    nationality: setNationality,
    operatingSystem: setOperatingSystem,
    cardNumber: setCardNumber,
  };

  const InvalidInputCheck = (func, value, name) => {
    InputValueSetter[name](value);
    if (!func(value) || value === "") {
      setIsInputInvalid([...isInputInvalid, name]);
    } else {
      cleanFromInvalidInput(name);
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "firstName":
        InvalidInputCheck(validateLetters, value, name);
        break;
      case "lastName":
        InvalidInputCheck(validateLetters, value, name);
        break;
      case "email":
        InvalidInputCheck(validateEmail, value, name);
        break;
      case "address":
        InvalidInputCheck(validateAddress, value, name);
        break;
      case "age":
        InvalidInputCheck(validateAge, value, name);
        break;
      case "nationality":
        InvalidInputCheck(validateLetters, value, name);
        break;
      case "operatingSystem":
        setOperatingSystem(value);
        if (value === "") {
          setIsInputInvalid([...isInputInvalid, e.target.name]);
        } else {
          cleanFromInvalidInput(name);
        }
        break;
      case "cardNumber":
        InvalidInputCheck(validateCardNumber, value, name);
        break;

      default:
        break;
    }
  };

  const inputValuesEnum = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    age: age,
    nationality: nationality,
    operatingSystem: operatingSystem,
    cardNumber: cardNumber,
  };

  const goNext = () => {
    if (isInputInvalid.length > 0) {
      return;
    }
    if (activeTabId === 1 && firstName && lastName && email) {
      setActiveTabId(() => activeTabId + 1);
      if (!completedTabs.includes(activeTabId)) {
        setCompletedTabs([...completedTabs, activeTabId]);
      }
    }
    if (activeTabId === 2 && address && age && email) {
      setActiveTabId(() => activeTabId + 1);
      if (!completedTabs.includes(activeTabId)) {
        setCompletedTabs([...completedTabs, activeTabId]);
      }
    }
  };

  const goPrevious = () => {
    if (activeTabId > 1) {
      setActiveTabId(() => activeTabId - 1);
    }
  };

  const finish = () => {
    if (completedTabs.length === 3 && isInputInvalid.length < 1) {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {tabs.map((tab, index) => {
        return (
          <button
            key={index}
            onClick={() => setActiveTabId(tab.tabId)}
            className={
              completedTabs.includes(tab.tabId - 1) || tab.tabId === 1
                ? "ui primary basic button"
                : "ui negative basic button"
            }
            disabled={!completedTabs.includes(tab.tabId) && tab.tabId !== 1}
          >
            {tab.tabName}
          </button>
        );
      })}

      <div style={{ display: "flex", flexDirection: "column", width: "50vh" }}>
        {activeTabId &&
          tabs
            .filter((tab) => {
              return tab.tabId === activeTabId;
            })[0]
            .content.map((input) => {
              return (
                <>
                  <Form.Input
                    key={input.key}
                    name={input.name}
                    placeholder={input.name}
                    onChange={(e) => handleInputChange(e)}
                    value={inputValuesEnum[input.name]}
                    size="large"
                  ></Form.Input>
                  {isInputInvalid.includes(input.name) && (
                    <Message error={true} content={input.error} />
                  )}
                </>
              );
            })}
        <div>
          {activeTabId !== 1 && (
            <Button primary onClick={goPrevious}>
              Previous
            </Button>
          )}
          {activeTabId !== 3 && (
            <Button primary onClick={goNext}>
              Next
            </Button>
          )}
          {activeTabId === 3 && (
            <Button primary onClick={finish}>
              Finish
            </Button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setOpen={openModal}
          setClose={closeModal}
          content={{
            firstName,
            lastName,
            email,
            address,
            age,
            nationality,
            cardNumber,
            operatingSystem,
          }}
        />
      )}
    </div>
  );
};

export default TabWizard;
