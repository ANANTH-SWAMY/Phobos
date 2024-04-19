import { useState } from "react";

const ConnectedMachinesPane = () => {
  const [connectedMachineList, setConnectedMachineList] = useState([
    1, 2,
  ]);
  const [selectedMachine, setSelectedMachine] = useState("");

  return (
    <div className="font-poppins">
      <h1 className="text-xl">Connected Machines</h1>
      <ul
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
      </ul>{" "}
    </div>
  );
};

export default ConnectedMachinesPane;
