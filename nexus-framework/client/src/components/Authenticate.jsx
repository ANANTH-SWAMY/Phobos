import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Auth = ({ auth, handleAuth, handleUserChange }) => {
  const [email, setEmail] = useState("");
  const [listEmail, setListEmail] = useState([]);

  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Enter email");
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

  useEffect(() => {
    if (!localStorage.getItem("emailList")) return;
    const emailList = localStorage.getItem("emailList");
    setListEmail(JSON.parse(emailList).list);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <Toaster />
      <div className="flex justify-center items-center w-[50%] gap-5 overflow-auto p-3 border-slate-600 border-2 rounded-xl">
        {listEmail.length ? (
          listEmail.map((ele, index) => {
            return (
              <div
                onClick={() => {
                  handleUserChange(ele);
                  toast(`User switched to : ${ele}`);
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
          <div className="text-slate-200">Nothing to show</div>
        )}
      </div>
      Hello World {"-->"} {localStorage.getItem("currUser")}
      {auth ? (
        <div>Auth Done</div>
      ) : (
        <div className="flex justify-center items-center gap-10">
          <input
            type="text"
            value={email}
            placeholder={"Enter mail"}
            className="p-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            disabled={email === ""}
            onClick={handleSubmit}
            className="border-2 p-2 rounded-md border-slate-800 flex justify-center items-center"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
