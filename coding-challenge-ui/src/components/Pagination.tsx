import React from "react";
import { PaginationContainer, PaginationBtn } from "./styledComponents";
import "primeicons/primeicons.css";

interface PaginationProps {
  page: number;
  rowsPerPage: number;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  onNext,
  onPrevious,
  hasNext,
}) => (
  <PaginationContainer>
    <PaginationBtn onClick={onPrevious} disabled={page === 1}>
      <i className="pi pi-angle-double-left"></i>
    </PaginationBtn>
    <span
      style={{
        margin: "0 10px",
        border: "1px solid gray",
        padding: "0px 10px",
        borderRadius: "5px",
      }}
    >
      {page}
    </span>
    <PaginationBtn onClick={onNext} disabled={!hasNext}>
      <i className="pi pi-angle-double-right"></i>
    </PaginationBtn>
  </PaginationContainer>
);

export default Pagination;
