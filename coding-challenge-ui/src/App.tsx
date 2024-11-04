import React, { useState, useEffect } from "react";
import OverdueOrdersTable from "./components/OverdueOrdersTable";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import { AppWrapper, OverdueOrder } from "./components/styledComponents";
import { User, Order, DataRow } from "./types/index";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [salesData, setSalesData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tableData, setTableData] = useState<DataRow[]>([]);
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, salesResponse] = await Promise.all([
          fetch("http://localhost:8080/user"),
          fetch(
            `http://localhost:8080/sales?limit=${rowsPerPage}&page=${page}`
          ),
        ]);

        if (!userResponse.ok || !salesResponse.ok) {
          throw new Error("Error fetching data");
        }

        const userData: User = await userResponse.json();
        const salesData: Order[] = await salesResponse.json();

        setUser(userData);
        setSalesData(salesData);

        const data: DataRow[] = salesData.map((order) => ({
          country: order.storeDetails.country,
          marketplace: order.storeDetails.marketplace,
          id: order.orderId,
          name: order.storeDetails.shopName,
          shipment_status: order.shipment_status,
          total: order.orderValue,
          item: order.items,
          destination: order.destination,
          date: order.latest_ship_date,
        }));

        setTableData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setPage((prev) => (prev > 1 ? prev - 1 : prev));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AppWrapper>
      <Header user={user} />
      <OverdueOrder>
        <h3 style={{ paddingLeft: "16px", paddingTop: "16px" }}>
          Overdue Orders
        </h3>
        <OverdueOrdersTable data={tableData} />
        <Pagination
          page={page}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          hasNext={tableData.length === rowsPerPage}
          rowsPerPage={0}
        />
      </OverdueOrder>
    </AppWrapper>
  );
};

export default App;
