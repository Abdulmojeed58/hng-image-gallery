import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <h1 className="text-[3rem] font-bold">An Error Occured!</h1>
      <div className="text-[1.5rem] flex">
        <p>Go to the home Page</p>
        <Link to="/" className="underline text-blue-400"> Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
