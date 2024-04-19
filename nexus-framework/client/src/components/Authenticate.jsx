import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import NavBar from "./NavBar";
import { IoMdSend } from "react-icons/io";

const Auth = ({ handleAuth, handleUserChange }) => {
  const [email, setEmail] = useState("");
  const [listEmail, setListEmail] = useState([]);

  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Enter email");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }
    const list = [...listEmail, email];
    setListEmail(list);
    localStorage.setItem("emailList", JSON.stringify({ list: list }));
    localStorage.setItem("currUser", email);
    handleUserChange(email);
    handleAuth(true);
    setEmail("");
    navigate("/dashboard");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (!localStorage.getItem("emailList")) return;
    const emailList = localStorage.getItem("emailList");
    setListEmail(JSON.parse(emailList).list);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <NavBar />
      <div className="w-full h-full flex flex-col justify-center  gap-10 items-center">
        <figure>
          <img src="public/logo.png" width={350} height={350} />
        </figure>
        {localStorage.getItem("currUser")
          ? `Current User : ${localStorage.getItem("currUser")}`
          : ""}
        <div className="flex justify-center items-center gap-10">
          <input
            type="email"
            value={email}
            placeholder={"Enter mail"}
            className="p-4 w-[300px] rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            disabled={email === ""}
            onClick={handleSubmit}
            className="border-2 p-2 rounded-md border-slate-800 flex justify-center items-center"
          >
            <IoMdSend />
          </button>
        </div>
        <div className="flex justify-start items-center w-[80%] md:w-[50%]  gap-5 overflow-auto p-3 border-slate-600 border-2 rounded-xl">
          {listEmail.length ? (
            listEmail.map((ele, index) => {
              return (
                <div
                  onClick={() => {
                    handleUserChange(ele);
                    handleAuth(true);
                    toast.success(
                      `User switched to : ${ele}`,
                      {
                        action: {
                          label: "Dashboard",
                          onClick: () => navigate("/dashboard"),
                        },
                      }
                    );
                    localStorage.setItem("currUser", ele);
                  }}
                  className="p-4 py-2  border-2 border-slate-800 rounded-md flex justify-center items-center cursor-pointer"
                  key={index}
                >
                  {ele}
                </div>
              );
            })
          ) : (
            <div className="text-slate-200">Login to get started</div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Auth;
