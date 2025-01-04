import {
  Gauge,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  List,
  LogOut,
  CirclePlus,
} from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Gauge />,
  },
  {
    id: "products",
    label: "Produk",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Daftar Pesanan",
    path: "/admin/orders",
    icon: <List />,
  },
  {
    id: "addorder",
    label: "Tambahkan Pesanan",
    path: "/admin/addorder",
    icon: <CirclePlus />,
  },
  // {
  //   id: "features",
  //   label: "Featured Images",
  //   path: "/admin/features",
  //   icon: <Images />,
  // }
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const isActive = (path) => {
    if (window.location.pathname === path) {
      return true;
    }
  }

  return (
    <nav className="flex flex-col gap-2 mt-8 ">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className= {`${
            isActive(menuItem.path) ? "bg-blue-700" : ""
          } flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-blue-700 text-black`}
          style={
            isActive(menuItem.path)
              ? { backgroundColor: "#1d4ed8", color: "white" }
              : { backgroundColor: "transparent" }
          }
        >
          
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <Fragment >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white border-r border-blue-600">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b border-blue-600">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} color="blue"/>
                <h1 className="text-2xl font-extrabold text-blue-600">Grand Mortar</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
            
          <Button
            onClick={handleLogout}
            className="inline-flex items-center w-full gap-2 py-2 mt-auto mb-1 text-sm font-medium bg-blue-700 rounded-md shadow hover:bg-blue-800"
          >
            <LogOut />
            Logout
          </Button>
        
          </div>
          
        </SheetContent>
      </Sheet>
      <aside className="fixed top-0 bottom-0 left-0 z-0 flex-col hidden w-64 p-6 bg-white shadow-xl lg:flex border-r border-gray-300">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} color="blue"/>
          <h1 className="text-2xl font-extrabold text-blue-600">Grand Mortar</h1>
        </div>
        <div className="border-t border-blue-600 mt-5">
        <MenuItems />
        </div>
          <Button
            onClick={handleLogout}
            className="inline-flex items-center w-full gap-2 py-2 mt-auto mb-1 text-sm font-medium bg-blue-700 rounded-md shadow hover:bg-blue-800"
          >
            <LogOut />
            Logout
          </Button>
        
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
