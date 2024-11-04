import React from "react";
import { render, screen } from "@testing-library/react";
import OverdueOrdersTable from "./OverdueOrdersTable";
import { DataRow } from "../types";

// Sample test data
const sampleData: DataRow[] = [
  {
    country: "GBR",
    marketplace: "Amazon UK",
    id: "1",
    name: "Store A",
    shipment_status: "Overdue",
    total: "$100.00",
    item: "Item 1",
    destination: "London",
    date: "01/01/2023",
  },
  {
    country: "USA",
    marketplace: "Amazon US",
    id: "2",
    name: "Store B",
    shipment_status: "Overdue",
    total: "$200.00",
    item: "Item 2",
    destination: "New York",
    date: "02/01/2023",
  },
];

describe("OverdueOrdersTable", () => {
  test("renders without crashing and displays correct number of rows", () => {
    render(<OverdueOrdersTable data={sampleData} />);

    // Check if the table is rendered
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Check if the correct number of rows is displayed
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(sampleData.length + 1); // +1 for the header row
  });
});
