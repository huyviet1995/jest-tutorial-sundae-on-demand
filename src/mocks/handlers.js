import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
        { name: "Strawberry", imagePath: "/images/strawberry.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Icecream", imagePath: "/images/ice-cream.png" },
        { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
        { name: "Cherries", imagePath: "/images/cherries.png" },
      ])
    );
  }),
];
