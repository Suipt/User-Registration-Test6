import { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const email = "example@gmail.com";
  const [code, setCode] = useState("");

  console.log(code);

  return (
    <form className=" flex flex-col p-8 bg-white shadow text-lg gap-6">
      <h1 className="text-xl font-bold">Enter your verification code</h1>
      <div className="text-base">
        <p>We Sent a code to {email}.</p>
        <p>Enter the code to continue.</p>
      </div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="p-3 bg-gray-100 outline-none w-80"
        placeholder="6-digit code"
      />
      <button
        type="submit"
        className="uppercase self-end bg-blue-700 p-3 px-6 text-white hover:bg-blue-800"
      >
        Verify
      </button>
      <span className="text-base text-blue-700 cursor-pointer">
        Resend code
      </span>
      <Link to="/register" className="text-blue-700 self-center underline">
        Or Register
      </Link>
    </form>
  );
};
