import { Outlet } from "react-router-dom";
import React from "react";
import BottomNav from "../components/BottomNav";

function Home() {
  return (
    <>
      <BottomNav />
      <Outlet />
    </>
  );
}

export default Home;
