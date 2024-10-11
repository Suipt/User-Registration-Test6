import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useUserContext } from "../../contexts/user-context";
import { useIsLoadingContext } from "../../contexts/isloading-context";
import { RenderIf } from "../../components/RenderIf";
import Loading from "../../components/loading/Loading";

const Login = () => {
  const { isLoading, setIsLoading } = useIsLoadingContext();
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call the login API
    setIsLoading(true);
    const res = await login(userInfo.email, userInfo.password);
    if (!res.success) {
      // show error message
      setErrorMessage(res.message);
      setUserInfo({
        email: "",
        password: "",
      });
    } else {
      // navigate to the home page
      setUser({
        name: res.user.name,
        email: res.user.email,
        isAuthenticated: true,
        isVerified: res.user.isVerified,
      });
      setUserInfo({
        email: "",
        password: "",
      });
      // navigate to the home page

      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <form
      className=" flex flex-col p-8 bg-white shadow text-lg gap-6"
      onSubmit={handleSubmit}
    >
      <RenderIf isTrue={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <h1 className="text-2xl self-center">Log in to the Application</h1>
        {/* <label htmlFor="email">email :</label> */}
        <span className="text-red-600 w-80 capitalize">{errorMessage}</span>
        <input
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="email"
          className="p-3 bg-gray-100 outline-none w-80"
        />
        {/* <label htmlFor="password">password :</label> */}
        <input
          name="password"
          type="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="password"
          className="p-3 bg-gray-100 outline-none"
        />
        <button
          type="submit"
          className="uppercase bg-blue-700 p-3 text-white hover:bg-blue-800"
        >
          login
        </button>
        <p className="self-center">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-blue-700 cursor-pointer underline"
          >
            Create an account
          </Link>
        </p>
      </RenderIf>
    </form>
  );
};

export default Login;
