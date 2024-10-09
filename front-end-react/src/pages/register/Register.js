import { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  console.log(userInfo);

  return (
    <form className=" flex flex-col p-8 bg-white shadow text-lg gap-6">
      <h1 className="text-2xl self-center">Register to the Application</h1>
      {/* <label htmlFor="email">email :</label> */}
      <input
        name="name"
        type="text"
        value={userInfo.name}
        onChange={handleChange}
        placeholder="name"
        className="p-3 bg-gray-100 outline-none w-80"
      />
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
        Registered?{" "}
        <Link to="/login" className="text-blue-700 cursor-pointer underline">
          Log in
        </Link>
      </p>
    </form>
  );
};
