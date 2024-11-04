export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

export interface Order {
  Id: string;
  storeId: string;
  orderId: string;
  latest_ship_date: string;
  shipment_status: string;
  destination: string;
  items: string;
  orderValue: string;
  storeDetails: {
    marketplace: string;
    country: string;
    shopName: string;
  };
}

export interface DataRow {
  country: string;
  marketplace: string;
  id: string;
  name: string;
  shipment_status: string;
  total: string;
  item: string;
  destination: string;
  date: string;
}
