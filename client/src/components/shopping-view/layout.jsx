
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex min-h-screen w-full">
        <div className="flex flex-1 flex-col">
            {/* admin slidebar*/} 
            <ShoppingHeader/>    
            <div className="flex flex-1 flex-col">              
                {/* admin Header*/}
                <main className="flex flex-1 bg-muted/40  p-4 md:p-6">
                    <Outlet/>                    
                </main>
            </div>
        </div>
    </div>
  )
}
export default ShoppingLayout;
