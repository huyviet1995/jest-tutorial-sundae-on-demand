import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";
import axios from "axios";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

// Now it is time for me to work with this!
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace null with Topping options when available
  const ItemComponent =
    optionType === "scoops"
      ? ScoopOptions
      : optionType === "toppings"
      ? ToppingOptions
      : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <Row>{optionItems.length > 0 ? optionItems : "No Items Available"}</Row>
  );
};

export default Options;
