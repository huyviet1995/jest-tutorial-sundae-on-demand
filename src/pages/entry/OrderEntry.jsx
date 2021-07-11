import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";

export default function OrderEntry() {
  const [orderDetails, updateItemCount] = useOrderDetails();
  return (
    <div className="root">
      <Options optionType={"toppings"} />
      <Options optionType={"scoops"} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
}
