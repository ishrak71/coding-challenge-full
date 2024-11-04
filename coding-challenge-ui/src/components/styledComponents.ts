import styled from "styled-components";
import { TableStyles } from "react-data-table-component";

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cccccc;
`;

export const AppHeader = styled.header`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
`;

export const OverdueOrder = styled.div`
  background-color: white;
  margin: 2rem;
`;

export const PaginationContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: end;
  padding-right: 40px;
  padding-bottom: 20px;
`;

export const PaginationBtn = styled.button`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Marketplace = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const HeaderText = styled.h1`
  font-family: "Roboto", sans-serif;
`;

export const Username = styled.span`
  font-family: "Roboto", sans-serif;
`;

export const CustomSortIcon = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .pi-sort-alt {
    color: black;
  }
`;

export const customTableStyles: TableStyles = {
  headCells: {
    style: {
      backgroundColor: "lightgray",
      color: "gray",
      fontWeight: 800,
    },
  },
  cells: {
    style: {
      fontWeight: 700,
    },
  },
};
