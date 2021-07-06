import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find the images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  expect(scoopImages).toHaveLength(3);

  // Confirm alt text of images
  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual([
    "Chocolate Scoop",
    "Vanilla Scoop",
    "Strawberry Scoop",
  ]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);
  const topppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(topppingImages).toHaveLength(3);

  const altTexts = topppingImages.map((element) => element.alt);

  expect(altTexts).toEqual([
    "Icecream Topping",
    "Hot Fudge Topping",
    "Cherries Topping",
  ]);
});
