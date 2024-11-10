import { House, LandPlot, LogOut, Menu, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SheetTitle, SheetTrigger,Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { customerViewHeaderMenuItems } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar,AvatarFallback } from "../ui/avatar";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";

function CustomerHeader() {

    const {isAuthenticated}=useSelector(state=>state.auth);
    // function MenuItems() {
    //     return (
    //     <nav className="flex flex-col mb-3 lg:mb-0 lg-items-center gap-6 lg:flex-row">
    //         {
    //             customerViewHeaderMenuItems.map(menuItem=><Link key={menuItem.id} to={menuItem.path} className="text-sm font-medium ">
    //             {menuItem.label}
    //             </Link>)
    //         }
    //     </nav>)
    // }

    function HeaderRightContent() {
        const {user}=useSelector(state=>state.auth);
        const navigate=useNavigate();
        const dispatch=useDispatch();

        function handleLogout(){
            dispatch(logoutUser())
        }
        return <div className="flex lg:items-center lg:flex-row flex-col gap-6">
            {/* <Button variant="outline" size="icon">
            <LandPlot className="w-6 h-6"/>
            <span className="sr-only">Property Cart</span>
            </Button> */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black cursor-pointer">
                        <AvatarFallback className="bg-black text-white font-extrabold ">{user?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56 ">
                    <DropdownMenuLabel>
                        Logged in as {user?.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {/* <DropdownMenuItem onClick={()=> navigate("/customer/account")}>
                    <UserRound  className="mr-2 h-4 w-4" />
                    Account
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4"/> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/customer/listing " className="flex items-center gap-2">
          <House className="h-6 w-6"/>
            <span className="font-bold">StayEase</span>
        </Link>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Header Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs" >
                {/* <MenuItems/> */}
                <HeaderRightContent/>
            </SheetContent>
        </Sheet>
        <div className="hidden lg:block ">
        {/* <MenuItems/> */}
        </div>
    {
        <div className="hidden lg:block"> 
            <HeaderRightContent/>
        </div> 
    }
      </div>
    </header>
  );
}

export default CustomerHeader;
