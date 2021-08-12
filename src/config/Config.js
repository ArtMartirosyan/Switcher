const Config = [
  {
    value: "gender",
    stringBuilder(value) {
      return value;
    },
  },

  {
    value: "name",
    stringBuilder(value) {
      return `${value.title} ${value.first} ${value.last}`;
    },
  },

  {
    value: "location",
    stringBuilder(value) {
      return `${value.location}  ${value.city}  street  ${value.street.name}`;
    },
  },

  {
    value: "email",
    stringBuilder(value) {
      return value;
    },
  },

  {
    value: "login",
    stringBuilder(value) {
      return `username:${value.username} password:${value.password}`;
    },
  },

  {
    value: "dob",
    stringBuilder(value) {
      return `Age:${value.age} Birthday:${value.date}`;
    },
  },

  {
    value: "registered",
    stringBuilder(value) {
      return `registered on:${value.date}`;
    },
  },

  {
    value: "phone",
    stringBuilder(value) {
      return value;
    },
  },
  {
    value: "cell",
    stringBuilder(value) {
      return value;
    },
  },
  {
    value: "id",
    stringBuilder(value) {
      return `id is ${value.name}, value: ${value.value}`;
    },
  },
  {
    value: "picture",
    stringBuilder(value) {
      return <img src={value}></img>;
    },
  },
];

export default Config;
