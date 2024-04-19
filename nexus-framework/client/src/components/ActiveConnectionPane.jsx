const ActiveConnectionPane = () => {
  const data = [
    {
      id: 1,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "123",
    },
    {
      id: 2,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "234",
    },
    {
      id: 3,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "345",
    },
    {
      id: 4,
      title:
        "Lorem proident officia officia incididunt. Tempor eu aliqua laboris Lorem labore reprehenderit elit non. Mollit non adipisicing dolor eu id nisi duis nostrud. Magna sunt est qui sint tempor proident anim magna sint. Dolor mollit qui velit adipisicing consequat quis commodo officia et laboris. Lorem adipisicing commodo amet duis dolor sint nostrud pariatur quis. Cupidatat elit Lorem eiusmod mollit",
      timestamp: "456",
    },
  ];
  return (
    <div>
      {data.length > 0 ? (
        data.map((ele) => {
          return (
            <div key={ele.id} className="w-full">
              <div className="">{ele.title}</div>
              <div className="">{ele.timestamp}</div>
            </div>
          );
        })
      ) : (
        <h2>Select a Machine & Listener to Proceed</h2>
      )}
    </div>
  );
};

export default ActiveConnectionPane;
