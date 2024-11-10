import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, MapPinHouse } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems=[
    // {
    //     id: 'dashboard',
    //     label: 'Dashboard',
    //     path: '/admin/dashboard',
    //     icons: <LayoutDashboard />
    // },
    {
        id: 'property',
        label: 'Property',
        path: '/admin/property',
        icons: <MapPinHouse />
    },
    // {
    //     id: 'orders',
    //     label: 'Orders',
    //     path: '/admin/orders',
    //     icons: <BadgeCheck />
    // },
]

function MenuItems({setOpen}) {
    const navigate=useNavigate();
    return( <nav className="mt-8  flex-col flex gap-2 ">
        {
            adminSidebarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=> {navigate(menuItem.path)
                setOpen ? setOpen(false):null
            }} className="flex items-center gap-2 text-xl cursor-pointer rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            {menuItem.icons}
            <span>{menuItem.label}</span>
            </div>)
        }
    </nav>)
}
function AdminSideBar({open,setOpen}) {

    const navigate=useNavigate();

    return (  
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64'>
                    <div className="flex flex-col h-full ">
                        <SheetHeader className='border-b'>
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30} />
                                <h1 className="text-2xl font-extrabold  ">Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden  w-64 flex-col border-r  bg-background  px lg:flex ">
                <div  onClick={()=>navigate("/admin/property")} className="flex items-center gap-2 lg:mt-[10%] cursor-pointer">
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
                </div>
                <MenuItems/>
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;