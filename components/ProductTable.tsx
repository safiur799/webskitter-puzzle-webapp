// components/ProductTable.tsx
import React, { useState } from "react";
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

interface Product {
  id: number;
  title: string;
  image: string;
  // Add other properties as needed
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleCellClick = (productId: number) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  const columns = 5;
  const rows = 4;

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
            selected={selectedProductId === product.id}
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
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(columns)].map((_, index) => (
              <TableCell key={index} style={{ border: "1px solid #fff" }}>
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
