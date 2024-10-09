import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // here will be some code

    navigate("/login");
  };

  return (
    <div className=" flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-bold capitalize">welcome 'name'</h1>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white p-3 text-lg px-6"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};
