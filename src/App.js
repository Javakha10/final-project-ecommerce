import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./component/layout";
import ProductFormPage from "./pages/ProductFormPage";
import { ProtectedRoute } from "./app/ProtectedRoute";
import { getUser, isUserAdmin } from "./app/util";
import { ProductContextProvider } from "./context/productContext";
import CategoryProducts from "./component/products/CategoryProducts";
import SingleProduct from "./component/products/SingleProduct";
import { CartContextProvider } from "./context/cartContext";
import { Cart } from "./component/cart/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile/:name" element={<ProfilePage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/products/categories/:categoryName"
                    element={<CategoryProducts />}
                  />
                  <Route
                    path="/products/categories/:categoryName/:productName"
                    element={<SingleProduct />}
                  />
                  <Route
                    path="/products/new"
                    element={
                      <ProtectedRoute hasAccess={isUserAdmin}>
                        <ProductFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products/edit/:name"
                    element={
                      <ProtectedRoute hasAccess={isUserAdmin}>
                        <ProductFormPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </MainLayout>
            </CartContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
