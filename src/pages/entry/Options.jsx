import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./Options";
import axios from "axios";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: Handle error
      });
  }, [optionType]);

  // TODO: replace null with Topping options when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <Row>{optionItems.length === 0 ? optionItems : "No Items Available"}</Row>
  );
};

export default Options;
