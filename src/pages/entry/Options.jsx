import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";
import axios from "axios";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

// Now it is time for me to work with this!
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

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

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionType);
      }}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems.length > 0 ? optionItems : "No Items Available"}</Row>
    </>
  );
};

export default Options;
