import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";

export default function Layout() {
  return (
    <div className="">
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
