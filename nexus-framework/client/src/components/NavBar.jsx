import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar font-poppins bg-base-100 outline outline-offset-4 outline-1 outline-stone-800 px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <img src="public/logo.png" width={60} height={20}></img>
        </a>
      </div>
      {localStorage.getItem("currUser") ? (
        <>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 space-x-4">
              <li>
                <a onClick={() => navigate("/dashboard")}>Dashboard</a>
              </li>
            </ul>
          </div>

          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="underline">
                    {localStorage.getItem("currUser")}
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li>
                      <a
                        onClick={() => {
                          navigate("/auth");
                          localStorage.removeItem("currUser");
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
