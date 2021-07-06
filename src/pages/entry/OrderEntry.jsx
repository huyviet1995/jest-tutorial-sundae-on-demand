import Options from "./Options";

export default function OrderEntry() {
  return (
    <div className="root">
      <Options optionType={"toppings"} />
      <Options optionType={"scoops"} />
    </div>
  );
}
