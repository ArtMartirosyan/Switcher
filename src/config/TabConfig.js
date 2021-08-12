const TabConfig = [
  {
    tabName: "first page",
    tabId: 1,
    content: [
      {
        name: "firstName",
        key: 1,
        error: "You should only use letters",
      },
      { name: "lastName", key: 2, error: "You should only use letters" },
      { name: "email", key: 3, error: "Enter a valid email" },
    ],
  },
  {
    tabName: "second page",
    tabId: 2,
    content: [
      { name: "address", key: 4, error: "enter a valid address" },
      {
        name: "age",
        key: 5,
        error: "age should include only numbers!(e.g 23)",
      },
      {
        name: "nationality",
        key: 6,
        error: "nationality should include only letters",
      },
    ],
  },
  {
    tabName: "third page",
    tabId: 3,
    content: [
      {
        name: "operatingSystem",
        key: 7,
        error: "The field cannot be empty",
      },
      { name: "cardNumber", key: 8, error: "enter a valid card number" },
    ],
  },
];

export default TabConfig;
