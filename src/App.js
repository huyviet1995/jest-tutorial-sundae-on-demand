import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/Summary/SummaryForm";
import Options from "./pages/entry/Options";

function App() {
  return (
    <div className="App">
      <Options optionType={"scoops"} />
    </div>
  );
}

export default App;
