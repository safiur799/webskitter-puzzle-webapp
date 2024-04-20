// components/ProductTable.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ProductCell from "./ProductCell";

//product properties
interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(
    null
  );
  const tableRef = useRef<HTMLTableElement>(null);
  const columns = 5;
  const rows = 4;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedCellIndex) return;

      let newIndex: number | null = null;

      switch (event.key) {
        case "ArrowUp":
          newIndex =
            selectedCellIndex - columns > 0
              ? selectedCellIndex - columns
              : null;
          break;
        case "ArrowDown":
          newIndex =
            selectedCellIndex == 15
              ? selectedCellIndex + columns
              : selectedCellIndex + columns < products.length
              ? selectedCellIndex + columns
              : null;
          break;
        case "ArrowLeft":
          newIndex =
            selectedCellIndex == 15
              ? selectedCellIndex - 1
              : selectedCellIndex % columns == 1
              ? null
              : selectedCellIndex - 1;
          break;
        case "ArrowRight":
          newIndex =
            selectedCellIndex % columns !== 0 ? selectedCellIndex + 1 : null;
          break;
        default:
          break;
      }

      if (newIndex !== null) {
        setSelectedCellIndex(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCellIndex, products]);

  const handleCellClick = (index: number) => {
    setSelectedCellIndex(index === selectedCellIndex ? null : index);
  };

  const renderCells = () => {
    const cells = [];
    let counter = 0;

    for (let i = 0; i < rows; i++) {
      const rowCells = [];
      for (let j = 0; j < columns; j++) {
        const product = products[counter];
        rowCells.push(
          <ProductCell
            key={product.id}
            product={product}
            selected={selectedCellIndex === product.id}
            onClick={() => handleCellClick(product.id)}
          />
        );
        counter++;
      }
      cells.push(<TableRow key={i}>{rowCells}</TableRow>);
    }

    return cells;
  };

  return (
    <TableContainer component={Paper}>
      <Table ref={tableRef}>
        <TableHead>
          <TableRow>
            {[...Array(columns)].map((_, index) => (
              <TableCell key={index} style={{ border: "1px solid #000" }}>
                Column {index + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderCells()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
