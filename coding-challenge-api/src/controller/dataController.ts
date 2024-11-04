import { readCSVWithPagination } from "../services/csvService";
import path from "path";
import { OrderDetails, StoreDetails } from "../models/types";

export const getData = async (req: any, res: any) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const page = parseInt(req.query.page as string, 10) || 1;
    const offset = (page - 1) * limit;

    const ordersFilePath = path.join(__dirname, "../../data/orders/orders.csv");
    const storesFilePath = path.join(__dirname, "../../data/stores.csv");

    const orders: OrderDetails[] = await readCSVWithPagination(
      ordersFilePath,
      limit,
      offset,
      "Pending"
    );

    const stores: StoreDetails[] = await readCSVWithPagination(
      storesFilePath,
      Number.MAX_SAFE_INTEGER,
      0
    );

    const storeMap: { [key: string]: StoreDetails } = {};
    stores.forEach((store) => {
      storeMap[store.storeId] = store;
    });

    const combinedData = orders.map((order) => {
      const storeDetails = storeMap[order.storeId] || {};
      return {
        ...order,
        storeDetails,
      };
    });

    res.json(combinedData);
  } catch (error) {
    console.log(error);
  }
};
