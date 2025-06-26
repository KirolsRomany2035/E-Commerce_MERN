import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCart from "../components/PoroductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUri";
import { Box } from "@mui/joy";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false)
  ;
  useEffect(() => {
    const fetchData = async () => {
     try {
     const response = await fetch(`${BASE_URL}/products`)
     const data = await response.json();
     setProducts(data);
    } catch  {
        setError(true)
    }
}
    fetchData();
     

  }, []);
  
   if (error) {
     return <Box>Something went wrong, please again! </Box>
   }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {products.map((p) => (
        <Grid  >
          <ProductCart {...p}/>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;