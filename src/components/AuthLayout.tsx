import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/* <div>Nav</div> */}
      <div className="grid place-items-center border border-black min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
