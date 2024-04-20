import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

const ActiveConnectionPane = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "123",
      ip: "1.2.3.4",
    },
    {
      id: 2,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "234",
      ip: "1.2.3.4",
    },
    {
      id: 3,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "345",
      ip: "1.2.3.4",
    },
    {
      id: 4,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "456",
      ip: "1.2.3.4",
    },
    {
      id: 5,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "567",
      ip: "1.2.3.4",
    },
  ]);

  const [showData, setShowData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  const handleClick = () => {
    setData([
      ...data,
      {
        id: 1,
        title:
          "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
        timestamp: "123",
        ip: "1.2.3.4",
      },
    ]);
    console.log("Added");
  };

  useEffect(() => {
    const printInterval = setInterval(() => {
      if (currIndex < data.length) {
        setShowData((prevData) => [...prevData, data[currIndex]]);
        setCurrIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(printInterval);
      }
    }, 500);

    return () => clearInterval(printInterval);
  }),
    [currIndex, data];

  return (
    <>
      <div
        onClick={handleClick}
        className="p-2 border border-white rounded-md cursor-pointer"
      >
        {" "}
        Add +
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        {showData.length > 0 ? (
          showData.map((ele) => {
            return (
              <div key={ele?.id} className="w-full">
                <div
                  onClick={() => console.log("Click")}
                  className=" w-full p-2 border-2 border-slate-600 rounded-md bg-slate-800 cursor-pointer"
                >
                  <div className="w-full flex justify-between items-center">
                    <div>IP : {ele?.ip}</div>
                    <div>{ele?.timestamp}</div>
                  </div>
                  <LinesEllipsis
                    text={ele?.title}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h2>Fetching Logs ...</h2>
        )}
      </div>
    </>
  );
};

export default ActiveConnectionPane;
