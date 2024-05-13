"use client";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myInfoAction } from "store/actions/userActions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingSelector } from "store/slices/appSlices";
import { WS_BASE_URL } from "services/constants";
import { myInfoSelector } from "store/slices/userSlices";
import { addChatMessageAction } from "store/actions/chatActions";

export const SocketContext = createContext();

const Bootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector) > 0;
  const userInfo = useSelector(myInfoSelector);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      dispatch(myInfoAction());
    }, 500);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "socket event");
        switch (data.action) {
          case "message":
            dispatch(addChatMessageAction(data));
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    if (userInfo.id) {
      console.warn("web socket created");
      setSocket(
        new WebSocket(
          WS_BASE_URL +
            `wss/users/${userInfo.id}/chat/?token=${localStorage
              .getItem("token")
              .replace("Bearer ", "")}`
        )
      );
    }
  }, [userInfo.id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
      <Backdrop sx={{ zIndex: 1395 }} open={isLoading} onClick={() => {}}>
        {isLoading && (
          <CircularProgress sx={{ color: "white", zIndex: 1399 }} />
        )}
      </Backdrop>
    </SocketContext.Provider>
  );
};

export default Bootstrap;
