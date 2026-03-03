import { Outlet, ScrollRestoration } from "react-router";
import MenuBar from "../components/menu/MenuBar";

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <MenuBar />
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
