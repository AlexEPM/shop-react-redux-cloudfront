import { Routes, Route } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import PageProductForm from "~/components/pages/PageProductForm/PageProductForm";
import PageOrders from "~/components/pages/PageOrders/PageOrders";
import PageOrder from "~/components/pages/PageOrder/PageOrder";
import PageProductImport from "~/components/pages/admin/PageProductImport/PageProductImport";
import PageCart from "~/components/pages/PageCart/PageCart";
import PageProducts from "~/components/pages/PageProducts/PageProducts";
import { Alert, AlertTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const authenticationErrors = [401, 403];

function App() {
  const [authenticationError, setAuthenticationError] = useState("");

  axios.interceptors.response.use(
    (response) => {
      setAuthenticationError("");
      return response;
    },
    (error) => {
      if (authenticationErrors.includes(error.response.status)) {
        setAuthenticationError(error.message);
      }
      return Promise.reject(error.message);
    }
  );

  return (
    <MainLayout>
      {authenticationError && (
        <Alert severity="error" onClose={() => setAuthenticationError("")}>
          <AlertTitle>Error</AlertTitle>
          {authenticationError}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="admin/orders">
          <Route index element={<PageOrders />} />
          <Route path=":id" element={<PageOrder />} />
        </Route>
        <Route path="admin/products" element={<PageProductImport />} />
        <Route path="admin/product-form">
          <Route index element={<PageProductForm />} />
          <Route path=":id" element={<PageProductForm />} />
        </Route>
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
