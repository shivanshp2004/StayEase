import CustomerHeader from "./header";
import { Outlet } from "react-router-dom";
function CustomerLayout() {
    return ( 
        <div className="flex flex-col bg-white overflow-hidden ">
            <CustomerHeader/>
            <main className="flex flex-col w-full ">

                <Outlet/>
            </main>
        </div>
     );
}

export default CustomerLayout;