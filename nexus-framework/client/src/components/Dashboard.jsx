import { useState } from "react";
import ListenersPane from "./ListenersPane";
import ActiveConnectionPane from "./ActiveConnectionPane";
import ConnectedMachinesPane from "./ConnectedMachinesPane";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import axios from "axios";
import { RxReload } from "react-icons/rx";

// const apiData = {
//   "192.168.95.186": {
//     bot_02_bruh: {
//       benign: 2,
//     },
//     bruteforce: {
//       "SQL Inj": 2,
//     },
//     "ddos-loic-udp": {
//       benign: 2,
//     },
//     infiltration_01: {
//       benign: 1,
//       Infilteration: 1,
//     },
//   },
// };

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [gotData, setGotData] = useState(null);

  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
  };

  const handleMailClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("currUser") }),
      });
      if (response.ok) {
        toast.success(`Mail sent to : ${localStorage.getItem("currUser")}`);
      } else {
        toast.error("Failed to send mail. Try again later");
      }
    } catch (err) {
      console.error("Error sending mail -->", err);
      toast.error("Something went wrong. Try again later");
    } finally {
      setLoading(false);
    }
  };

  function parseReq(data) {
    let res = [];
    const ips = Object.keys(data);

    ips.forEach((ip) => {
      const attackTypes = Object.keys(data[ip]);
      const predicts = {};

      attackTypes.forEach((attackType) => {
        predicts[attackType] = data[ip][attackType];
      });

      res.push({
        ip: ip,
        attacks: attackTypes,
        predicts: predicts,
      });
    });
    console.log(res);
    setParsedData(res);
  }

  const handleApiCall = async () => {
    try {
      const apiData = await axios.get("http://192.168.95.231:8000/", {headers: {}});
      console.log(apiData);
      setDataList([...dataList, apiData.data]);
      parseReq(apiData.data);
      setGotData(apiData.data);
      toast.success("Data Got");
      
    } catch (err) {
      console.error("Error getting data -->", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleApiCall();
  }, []);

  return (
    <div className="h-screen relative">
      <Toaster richColors />
      <div onClick={handleApiCall} className="absolute top-7 left-2 p-2 flex justify-center items-center rounded-md border-white border-2"><RxReload /></div>
      <div className="navbar font-poppins bg-base-100 outline outline-offset-4 outline-1 outline-stone-800 px-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img src="public/logo.png" width={60} height={20}></img>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li>
              <a
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => handleTabClick("overview")}
              >
                Overview
              </a>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                target="_blank"
                href="https://github.com/ANANTH-SWAMY/Vajra"
                rel="noreferrer"
              >
                Docs
              </a>
            </li>
            <li>
              <details>
                <summary className="underline">
                  {localStorage.getItem("currUser")}
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a onClick={() => navigate("/auth")}>Change Account</a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        localStorage.removeItem("currUser");
                        navigate("/auth");
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
      </div>
      {activeTab === "overview" && (
        <div className="w-screen">
          <div className="w-full flex justify-between items-center">
            <h1 className="font-poppins text-4xl font-bold mt-8 ml-10">
              Dashboard
            </h1>
            <button
              disabled={loading}
              className="p-4 py-2 border-2 border-yellow-600 rounded-md mt-8 mr-10 flex justify-center items-center"
              onClick={handleMailClick}
            >
              {loading ? <MoonLoader color="#FFF" size={20} /> : "Mail"}
            </button>
          </div>
          <div className="px-10 flex gap-4 h-full  w-[100%]">
            <div className="flex flex-col justify-around items-center w-[50%]">
              <div className="card border border-base-300 mt-10 w-full h-[250px] overflow-auto">
                <div className="card-body flex justify-self-start px-4 py-8 bg-base-200 rounded-2xl">
                  <ConnectedMachinesPane
                    selectedLog={selectedLog}
                    apiData={gotData}
                  />
                </div>
              </div>
              <div className="card border border-base-300 mt-2 w-full h-[290px] overflow-auto">
                <div className="card-body flex justify-self-start px-4 py-4 bg-base-200 rounded-2xl">
                  <ListenersPane parsedData={parsedData} />
                </div>
              </div>
            </div>
            <div className="mockup-window relative card border border-base-300 mt-10 row-span-2 w-[50%] h-[540px] flex justify-end items-end">
              <div className="absolute top-2 right-5">
                <SyncLoader color={"#FFF"} size={5} />
              </div>
              <div className="card-body flex justify-start w-full items-center py-8 bg-base-200 rounded-sm overflow-auto">
                <ActiveConnectionPane
                  handleLogClick={handleLogClick}
                  dataList={dataList}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
