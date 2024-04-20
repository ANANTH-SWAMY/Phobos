import { useState } from "react";

const ConnectedMachinesPane = ({ selectedLog }) => {
  const [connectedMachineList, setConnectedMachineList] = useState([1, 2]);
  const [selectedMachine, setSelectedMachine] = useState("");

  return (
    <div className="font-poppins">
      <h1 className="text-xl">Log Summary</h1>
      {/* <ul
        className={`menu menu-lg bg-base-200 w-100 gap-2 flex justify-center items-${
          connectedMachineList.length > 0 ? "start" : "center"
        }`}
      >
        {connectedMachineList.length > 0
          ? connectedMachineList.map((ele, id) => {
              return (
                <li key={id} className="w-full">
                  <a
                    onClick={() => setSelectedMachine(ele)}
                    className={`${ele === selectedMachine ? "active" : ""}`}
                  >
                    {ele}
                  </a>
                </li>
              );
            })
          : "Nothing to show"}
      </ul>{" "} */}
      {selectedLog ? (
        <div className="flex flex-col gap-2 mt-4">
          <div className="w-full flex justify-between items-center">
            <div className="">IP : {selectedLog.ip}</div>
            <div className="">Time : {selectedLog.timestamp}</div>
          </div>
          <div>{selectedLog.title}</div>
        </div>
      ) : (
        "Get started by selecting a Log"
      )}
    </div>
  );
};

export default ConnectedMachinesPane;
