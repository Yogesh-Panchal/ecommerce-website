import { Fragment } from "react";
import { ChartNoAxesCombined,CircleCheckBig, Gauge, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
//import { adminSidebarMenuItems } from "@/config";


const adminSidebarMenuItems =[
    {
        id:'dashboard',
        label:'dashboard',
        path:'/admin/dashboard',
        icon:<Gauge/>,
    },{
        id:'product',
        label:'product',
        path:'/admin/product',
        icon:<ShoppingCart />,
    },
    {
        id:'orders',
        label:'orders',
        path:'/admin/orders',
        icon:<CircleCheckBig />,
    },
    
]

function MenuItem(){
  const navigate= useNavigate();
  return(
    <nav className="mt-8 flex-col flex gap-2">
      {
        adminSidebarMenuItems.map(MenuItem => <div key={MenuItem.id} onClick={()=>navigate(MenuItem.path)} className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground ">
          {MenuItem.icon}
          <span>{MenuItem.label}</span>
        </div>
        )        
      }
    </nav>
  )
}


function AdminSidebar() {
  
  const navigate= useNavigate();
  return (
   <Fragment>
    <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
      <div onClick={()=>navigate('/admin/dashboard')}
       className="flex cursor-pointer items-center gap-2">
        <ChartNoAxesCombined  size={30}/>
        <h1 className="text-xl font-extrabold ">Admin Panel</h1>
      </div>
      <MenuItem/>
    </aside>
   </Fragment>
  );
}
export default AdminSidebar;