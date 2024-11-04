import React from "react";
import DataTable from "react-data-table-component";
import {
  customTableStyles,
  CustomSortIcon,
  Marketplace,
} from "./styledComponents";
import { DataRow } from "../types";

interface OverdueOrdersTableProps {
  data: DataRow[];
}

const OverdueOrdersTable: React.FC<OverdueOrdersTableProps> = ({ data }) => {
  const countryToFlagMap: { [key: string]: string } = {
    GBR: "gb",
    AUS: "au",
    USA: "us",
    // Add other mappings as necessary
  };

  const columns = [
    {
      name: "MARKETPLACE",
      cell: (row: DataRow) => (
        <Marketplace>
          <img
            src={`https://flagcdn.com/w320/${
              countryToFlagMap[row.country]
            }.png`}
            alt={row.country}
            width="22"
            height="17"
            style={{ marginRight: "5px" }}
          />
          {row.marketplace}
        </Marketplace>
      ),
    },
    {
      name: "STORE",
      selector: (row: DataRow) => row.name,
    },
    {
      name: "ORDER ID",
      selector: (row: DataRow) => row.id,
    },
    {
      name: "ORDER VALUE",
      selector: (row: DataRow) => row.total,
      sortable: true,
      right: true,
    },
    {
      name: "ITEMS",
      selector: (row: DataRow) => row.item,
      sortable: true,
      center: true,
    },
    {
      name: "DESTINATION",
      selector: (row: DataRow) => row.destination,
    },
    {
      name: "DAYS OVERDUE",
      selector: (row: DataRow) => {
        if (!row.date) return "N/A";
        const parts = row.date.split("/");
        if (parts.length !== 3) return "Invalid Date";
        const orderDate = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0])
        );
        const currentDate = new Date();
        const daysOverdue = Math.floor(
          (currentDate.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)
        );
        return daysOverdue >= 0 ? daysOverdue : 0;
      },
      sortable: true,
      center: true,
      style: { color: "red" },
    },
  ];

  return (
    <DataTable
      customStyles={customTableStyles}
      columns={columns}
      data={data}
      highlightOnHover
      sortIcon={
        <CustomSortIcon>
          <i className="pi pi-sort-alt" />
        </CustomSortIcon>
      }
    />
  );
};

export default OverdueOrdersTable;
