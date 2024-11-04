export interface OrderDetails {
  Id: string;
  storeId: string;
  orderId: string;
  latest_ship_date: string;
  shipment_status: string;
  destination: string;
  items: string;
  orderValue: string;
}

export interface StoreDetails {
  storeId: string;
  marketplace: string;
  country: string;
  shopName: string;
}
