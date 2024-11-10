import { Navigate, Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout.jsx"
import AuthLogin from "./pages/auth/login.jsx"
import AuthRegister from "./pages/auth/register.jsx"
import AdminLayout from "./components/admin-view/layout.jsx"
import AdminDashboard from "./pages/admin-view/dashboard.jsx"
import AdminFeatures from "./pages/admin-view/features.jsx"
import AdminOrders from "./pages/admin-view/orders.jsx"
import AdminProperty from "./pages/admin-view/property.jsx"
import CustomerLayout from "./components/customer-view/layout.jsx"
import NotFound from "./pages/not-found/index.jsx"
import CustomerAccount from "./pages/customer-view/account.jsx"
import CustomerCheckout from "./pages/customer-view/checkout.jsx"
import CustomerHome from "./pages/customer-view/home.jsx"
import CustomerListing from "./pages/customer-view/listing.jsx"
import CheckAuth from "./components/common/check-auth.jsx"
import UnAuthPage from "./pages/unauth-page/index.jsx"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice/index.js"
import { useDispatch } from "react-redux"
import { Skeleton } from "@/components/ui/skeleton"

function App() {
  const {user, isAuthenticated, isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth());
  },[dispatch])
  if(isLoading) return <Skeleton className="w-[400px]  h-[400px] rounded-full " />

  return (
    <div className="flex flex-col overflow-hidden bg-white ">
        {/* <h1>Header Components</h1>  */}
        <Routes>


        <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
          </Route>

          <Route path="admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
            <Route path="dashboard" element={<AdminDashboard/>}></Route>
            <Route path="features" element={<AdminFeatures/>}></Route>
            <Route path="orders" element={<AdminOrders/>}></Route>
            <Route path="property" element={<AdminProperty/>}></Route>
          </Route>

          <Route path="/customer" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><CustomerLayout/></CheckAuth>}>
            <Route path="account" element={<CustomerAccount/>}></Route>
            <Route path="checkout" element={<CustomerCheckout/>}></Route>
            <Route path="home" element={<CustomerHome/>}></Route>
            <Route path="listing" element={<CustomerListing/>}></Route>
          </Route>
          
          <Route path="/unauth-page" element={<UnAuthPage/>}></Route>

          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </div>
   
  )
}

export default App
