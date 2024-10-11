import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/user-context";
import { useEffect } from "react";

const Home = () => {
  const { user, setUser } = useUserContext();
  console.log(user);

  const navigate = useNavigate();

  const handleLogout = () => {
    // here will be some code

    navigate("/login");
  };

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/register");
    } else if (!user.isVerified) {
      navigate("/verify");
    }
  }, [user]);

  return (
    <div className=" flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-bold capitalize">welcome {user?.name}</h1>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white p-3 text-lg px-6"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Home;
