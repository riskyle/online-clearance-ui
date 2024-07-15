import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}
