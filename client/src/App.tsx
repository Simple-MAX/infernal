import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import Gun from "gun";
import { addMessage } from "./store/slices/messages";
import { DateTime } from "luxon";

const gun = Gun({
  peers: ["https://infinite-forest-74906.herokuapp.com/gun"],
});

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.messages);
  const [formState, setForm] = useState({
    name: "",
    message: "",
    url: "https://media.istockphoto.com/photos/masked-hacker-in-a-hoodie-standing-in-corporate-data-center-with-rows-picture-id802320762?k=6&m=802320762&s=612x612&w=0&h=D-ajRZUMl2m77etlLmwKdFjlMOoar3jttTGLaUaqs7k=",
  });

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().on((info: any) => {
      if (info != null) {
        dispatch(
          addMessage({
            name: info.name,
            message: info.message,
            createAt: info.createAt,
            url: info.url,
          })
        );
      }
    });
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...formState, [e.target.name]: e.target.value });
  }

  function sendMessage() {
    const messages = gun.get("messages");
    messages.set({
      // @ts-ignore
      name: formState.name,
      // @ts-ignore
      message: formState.message,
      // @ts-ignore
      createAt: Date.now(),
    });
    setForm({
      name: "",
      message: "",
      url: "https://media.istockphoto.com/photos/masked-hacker-in-a-hoodie-standing-in-corporate-data-center-with-rows-picture-id802320762?k=6&m=802320762&s=612x612&w=0&h=D-ajRZUMl2m77etlLmwKdFjlMOoar3jttTGLaUaqs7k=",
    });
  }

  function purgeMessage() {
    const messages = gun.get("messages");
  }

  return (
    <div className="flex bg-gray-900 h-screen w-full justify-center items-end ">
      <div className="flex flex-col overflow-scroll">
        <div className="flex flex-col w-2/7 justify-center items-center gap-4">
          {state.messages.map((info) => (
            <div
              key={info.message}
              className="flex flex-row justify-between items-center w-full h-auto bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex flex-row items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full"
                  src={info.url}
                  alt="image"
                />
                <div className="flex flex-col">
                  <span className="uppercase text-white font-semibold">
                    {info.name}
                  </span>
                  <span className="uppercase text-white font-bold">
                    {info.message}
                  </span>
                </div>
              </div>
              <span className="uppercase text-white font-light">
                {/* {DateTime.fromMillis(info.createAt).toLocaleString()} */}
                {info.createAt}
              </span>
            </div>
          ))}
        </div>
        <div className="sticky flex flex-row gap-2 py-4">
          <input
            name="name"
            placeholder="Name"
            value={formState.name}
            type="text"
            onChange={onChange}
            className="shadow appearance-none border rounded w-2/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            name="img"
            placeholder="image url"
            value={formState.url}
            type="text"
            onChange={onChange}
            className="shadow appearance-none border rounded w-2/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            name="message"
            placeholder="message"
            value={formState.message}
            type="text"
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={sendMessage}
          >
            Send
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={purgeMessage}
          >
            Purge
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
