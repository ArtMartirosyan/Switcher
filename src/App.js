import { useState } from "react";
// import Switcher from "./components/Switcher";
// import Currency from "./components/Currency";
// import Testing from "./components/Testing";
// import Testing_2 from "./components/Testing_2";
import TabWizard from "./components/TabWizard";
import TabConfig from "./config/TabConfig";

function App() {
  const [isImgCntVisible, setIsImgCntVisible] = useState(false);
  const [switcherExtValue, setSwitcherExtValue] = useState(false);

  const switcherChangeHandler = (value) => {
    setIsImgCntVisible(value);
  };

  // setTimeout(() => {
  //   setSwitcherExtValue(true);
  // }, 5000);

  return (
    <div>
      <TabWizard tabs={TabConfig} />
      {/* <Currency /> */}
      {/* <Testing /> */}
      {/* <Testing_2 /> */}
      {/* {isImgCntVisible && <div>image</div>}

      <Switcher
        defaultValue={false}
        disabled={false}
        value={switcherExtValue}
        onChange={switcherChangeHandler}
        onText="exampleOn"
        offText="exampleOff"
        labelPosition="right"
        size="small"
      /> */}
    </div>
  );
}

export default App;
