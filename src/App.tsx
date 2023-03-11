import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { InvoicesPage } from "./pages/Invoices";
import { CreateInvoicePage } from "./pages/CreateInvoice";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="create-invoice" element={<CreateInvoicePage />} />
      </Route>
    </Routes>
  );
}
