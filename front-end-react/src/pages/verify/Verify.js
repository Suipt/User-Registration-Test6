import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/user-context";
import { useNavigate } from "react-router-dom";
import { verifyCode } from "../../api";
import { useIsLoadingContext } from "../../contexts/isloading-context";
import { RenderIf } from "../../components/RenderIf";
import Loading from "../../components/loading/Loading";

const Verify = () => {
  const { isLoading, setIsLoading } = useIsLoadingContext();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await verifyCode(user.email, code);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setUser({ ...user, isVerified: true });
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
        <h1 className="text-xl font-bold">Enter your verification code</h1>
        <div className="text-base">
          <p>We Sent a code to {user?.email}.</p>
          <p>Enter the code to continue.</p>
        </div>
        <span className="text-red-600 w-80 capitalize">{errorMessage}</span>
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
      </RenderIf>
    </form>
  );
};

export default Verify;
