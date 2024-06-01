import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";
import { AuthProvider } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InventoryProvider } from "./context/inventoryContext";


const queryClient  = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <InventoryProvider>
        <App />
        </InventoryProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
