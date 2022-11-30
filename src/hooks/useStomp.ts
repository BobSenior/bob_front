import StompJs from "@stomp/stompjs";
import { toast } from "react-toastify";
import { useCallback } from "react";

const clients: { [key: string]: StompJs.Client } = {};

const useStomp = (type: string): [StompJs.Client | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (clients[type]) {
      clients[type]
        .deactivate()
        .then(() => {
          toast.info("연결 해제 성공!");
        })
        .catch(() => {
          toast.error("연결 해제 실패");
        });
      delete clients[type];
    }
  }, []);

  if (!clients[type]) {
    clients[type] = new StompJs.Client({
      brokerURL: `ws://localhost:8080/ws/${type}`,
      debug: (str) => console.log(str),
    });
  } else {
    return [undefined, disconnect];
  }

  return [clients[type], disconnect];
};

export default useStomp;
