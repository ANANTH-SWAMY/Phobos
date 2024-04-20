import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

const ActiveConnectionPane = ({ handleLogClick, dataList }) => {
  const [showData, setShowData] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const printInterval = setInterval(() => {
      if (currIndex < dataList.length) {
        setShowData((prevData) => [...prevData, dataList[currIndex]]);
        setCurrIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(printInterval);
      }
    }, 500);

    return () => clearInterval(printInterval);
  }, [currIndex, dataList]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        {showData.length > 0 ? (
          showData.map((entry, index) => ( 
            <div key={index} className="w-full cursor-pointer" onClick={handleLogClick(entry)}>
              {Object.entries(entry).map(([ip, data]) => (
                <div key={ip}>
                  <h3>IP: {ip}</h3>
                  {Object.entries(data).map(([attackType, counts]) => (
                    <div key={attackType} className="border p-2 mb-2">
                      <h4>Attack Type: {attackType}</h4>
                      {Object.entries(counts).map(([key, value]) => (
                        <p key={key}>
                          {key}: {value}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        ) : (
          <h2>Fetching Data...</h2>
        )}
      </div>
    </>
  );
};

export default ActiveConnectionPane;
