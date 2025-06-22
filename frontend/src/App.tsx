import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/appContext/useAppContext";
import AddHotel from "./pages/AddHotels";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />
        <Route path="/search" element={<Layout>Search Page</Layout>} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
