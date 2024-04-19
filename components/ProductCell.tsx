// components/ProductCell.tsx
import React from "react";
import { TableCell } from "@mui/material";

interface Product {
  id: number;
  title: string;
  image: string;
  // Add other properties as needed
}

interface ProductCellProps {
  product: Product;
  selected: boolean;
  onClick: () => void;
}

const ProductCell: React.FC<ProductCellProps> = ({
  product,
  selected,
  onClick,
}) => {
  return (
    <TableCell
      onClick={onClick}
      style={{
        backgroundColor: selected ? "white" : "black",
        cursor: "pointer",
        border: "1px solid #fff",
      }}
    >
      {!selected && (
        <div style={{ width: "100px", height: "100px", background: "black" }} />
      )}
      {selected && (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </TableCell>
  );
};

export default ProductCell;
