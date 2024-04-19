// pages/index.tsx
import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import ProductTable from "../components/ProductTable";

interface Product {
  id: number;
  title: string;
  image: string;
  // Add other properties as needed
}

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return <ProductTable products={products} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: products } = await axios.get(
      "https://fakestoreapi.com/products"
    );
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;
