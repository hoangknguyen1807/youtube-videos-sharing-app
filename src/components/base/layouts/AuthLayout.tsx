import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

const AuthLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const token = localStorage.getItem('token');
  if (user || token)  {
    return <Navigate to="/"/>;
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-primary">
      <div className="w-[28rem] px-7 py-5 bg-secondary rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
