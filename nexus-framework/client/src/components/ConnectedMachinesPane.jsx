import { useState } from "react";

const ConnectedMachinesPane = ({ selectedLog }) => {
  const [selectedMachine, setSelectedMachine] = useState("");

  return (
    <div className="font-poppins">
      <h1 className="text-xl">Log Summary</h1>
      <div className={`flex justify-${selectedLog ? "start" : "center"} items-${selectedLog ? "start" : "center"} ${selectedLog ? "" : "h-full"}`}>
        {selectedLog ? (
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full flex justify-between items-center">
              <div className="">IP : {selectedLog.ip}</div>
            </div>
            {Object.entries(selectedLog).map(([attackType, details]) => (
              <div key={attackType}>
                <div className="font-bold">{attackType}</div>
                {Object.entries(details).map(([key, value]) => (
                  <div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          "Get started by selecting a Log"
        )}
      </div>
    </div>
  );
};

export default ConnectedMachinesPane;
