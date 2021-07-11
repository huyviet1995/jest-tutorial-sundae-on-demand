import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");

  // update chocolate scoops to 2 and update subtotal
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const icecreamInput = await screen.findByRole("spinbutton", {
    name: /icecream/i,
  });

  userEvent.clear(icecreamInput);
  userEvent.type(icecreamInput, "1");

  const icecreamCheckbox = await screen.findByRole("checkbox", {
    name: /icecream/i,
  });

  userEvent.click(icecreamCheckbox);

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  userEvent.click(icecreamCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  userEvent.click(icecreamCheckbox);
  // Does this actually happen asynchronously?
  // I believe that it should because when the user clicks the icecreamCheckbox => updateItemCount happen again, which should re-render the whole component
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // I understand this part now.
  userEvent.clear(icecreamInput);
  userEvent.type(icecreamInput, "2");
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const icecreamInput = await screen.findByRole("spinbutton", {
      name: /icecream/i,
    });
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    userEvent.clear(icecreamInput);
    userEvent.type(icecreamInput, "2");
    expect(grandTotal).toHaveTextContent("3.00");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    // how should I do this though?
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const icecreamInput = await screen.findByRole("spinbutton", {
      name: /icecream/i,
    });
    userEvent.clear(icecreamInput);
    userEvent.type(icecreamInput, "2");
    expect(grandTotal).toHaveTextContent("5.00");

    userEvent.clear(icecreamInput);
    userEvent.type(icecreamInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
});
