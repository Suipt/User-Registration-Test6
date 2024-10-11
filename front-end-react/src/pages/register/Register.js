import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api";
import { useUserContext } from "../../contexts/user-context";
import { useIsLoadingContext } from "../../contexts/isloading-context";
import { RenderIf } from "../../components/RenderIf";
import Loading from "../../components/loading/Loading";

const Register = () => {
  const { isLoading, setIsLoading } = useIsLoadingContext();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMessage("");
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: send the user info to the server
    const res = await register(userInfo);
    if (!res.success) {
      setErrorMessage(res.message);
      // show error
      setUserInfo({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setUser({
        ...user,
        name: res.user.name,
        email: res.user.email,
        isAuthenticated: true,
        isVerified: false,
      });
      navigate("/");
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [setIsLoading]);

  // useEffect

  return (
    <form
      className=" flex flex-col p-8 bg-white shadow text-lg gap-6 max-w-full"
      onSubmit={handleSubmit}
    >
      <RenderIf isTrue={isLoading}>
        <Loading />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <h1 className="text-2xl self-center">Register to the Application</h1>
        {/* <label htmlFor="email">email :</label> */}
        <span className="text-red-600 w-80 capitalize">{errorMessage}</span>
        <input
          name="name"
          type="text"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="name"
          className="p-3 bg-gray-100 outline-none w-80 max-w-full"
        />
        <input
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="email"
          className="p-3 bg-gray-100 outline-none w-80 max-w-full"
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
          Sign up
        </button>
        <p className="self-center">
          Registered?{" "}
          <Link to="/login" className="text-blue-700 cursor-pointer underline">
            Log in
          </Link>
        </p>
      </RenderIf>
    </form>
  );
};

export default Register;
