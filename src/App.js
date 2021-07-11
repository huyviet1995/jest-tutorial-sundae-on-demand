import React, { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/Summary/SummaryForm";
import Options from "./pages/entry/Options";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and Entry page needs provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
