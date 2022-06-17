import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sepet" element={<BasketPage />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
