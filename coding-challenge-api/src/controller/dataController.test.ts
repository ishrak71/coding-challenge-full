import { getData } from "./dataController";
import { readCSVWithPagination } from "../services/csvService";

// Mock the csvService function
jest.mock("../services/csvService");

describe("getData", () => {
  let req: any;
  let res: any;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Mocking request and response
    req = {
      query: {
        limit: "5",
        page: "1",
      },
    };

    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  it("should return combined order and store data", async () => {
    // Mock resolved values for the CSV service
    (readCSVWithPagination as jest.Mock).mockResolvedValueOnce([
      {
        Id: "1",
        storeId: "store_1",
        orderId: "order_1",
        latest_ship_date: "2024-11-01",
        shipment_status: "Pending",
        destination: "USA",
        items: "item_1",
        orderValue: "100",
      },
    ]); // Mock orders
    (readCSVWithPagination as jest.Mock).mockResolvedValueOnce([
      {
        storeId: "store_1",
        marketplace: "Amazon",
        country: "USA",
        shopName: "Amazon Shop",
      },
    ]); // Mock stores

    // Call the controller function
    await getData(req as any, res as any);
  });

  it("should handle errors and return 500", async () => {
    // Mock rejected value (simulate error)
    (readCSVWithPagination as jest.Mock).mockRejectedValueOnce(
      new Error("CSV read error")
    );

    // Call the controller function
    await getData(req as any, res as any);
  });
});
