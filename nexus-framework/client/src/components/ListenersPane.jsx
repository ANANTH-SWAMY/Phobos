import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";

const ListenersPane = ({ parsedData }) => {
  const [currData, setCurrData] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (!parsedData) return;
    const printInterval = setInterval(() => {
      if (currIndex < parsedData.length) {
        const { ip, predicts } = parsedData[currIndex];
        const formattedData = Object.entries(predicts).map(
          ([attack, counts]) => ({
            name: attack,
            log_stuff: Object.values(counts).reduce(
              (total, count) => total + count,
              0
            ),
          })
        );
        setCurrData((prevData) => [...prevData, { ip, data: formattedData }]);
        setCurrIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(printInterval);
      }
    }, 1000);

    return () => clearInterval(printInterval);
  }, [currIndex, parsedData]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!parsedData ? (
        "Nothing"
      ) : (
        <LineChart
          width={600}
          height={220}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {currData.map(({ ip, data }, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="log_stuff"
              data={data}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each IP
              name={ip}
            />
          ))}
        </LineChart>
      )}
    </div>
  );
};

export default ListenersPane;
