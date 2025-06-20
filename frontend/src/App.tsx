import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"


function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout>Home Page</Layout>}/>
      <Route path="/search" element={<Layout>Search Page</Layout>}/>
      <Route path="/register" element={<Layout><Register/></Layout>}/>
      <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
      

      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
