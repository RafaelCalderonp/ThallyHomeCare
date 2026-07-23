import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import CheckoutWhatsapp from "./pages/CheckoutWhatsapp";

import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/nosotros" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/catalogo" element={<PublicLayout><Catalog /></PublicLayout>} />
      <Route path="/producto/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
      <Route path="/carrito" element={<PublicLayout><Cart /></PublicLayout>} />
      <Route path="/checkout/success" element={<PublicLayout><CheckoutSuccess /></PublicLayout>} />
      <Route path="/checkout/cancel" element={<PublicLayout><CheckoutCancel /></PublicLayout>} />
      <Route
        path="/checkout/whatsapp-enviado"
        element={<PublicLayout><CheckoutWhatsapp /></PublicLayout>}
      />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="productos" element={<AdminProducts />} />
        <Route path="pedidos" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default App;
