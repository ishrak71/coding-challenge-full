import { getUser } from "./user";

test("getUser returns user details", () => {
  const res = {
    json: jest.fn(),
  };
  getUser(null, res);
  expect(res.json).toHaveBeenCalledWith({
    firstName: "Ishrak",
    lastName: "Karim",
    email: "ishrak71@gmail.com",
    id: 1,
  });
});
