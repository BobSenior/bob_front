import { useCallback } from "react";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

const url = "http://localhost:8080/ws/chat";
const socks: { [key: string]: WebSocket } = {};
const stomps: { [key: string]: StompJs.Client } = {};
const useStomp = (): [
  stomp: StompJs.Client,
  disconnect: (unsubscribe: () => void) => void,
    socks:WebSocket
] => {
  const disconnect = useCallback(
    (onUnsubscribe: () => void) => {
      if (stomps["chat"] && stomps["chat"].connected) {
        stomps["chat"].disconnect(onUnsubscribe);
        delete stomps["chat"];
      }
      if (socks["chat"]) delete socks["chat"];
    },
    [stomps, socks]
  );

  if (!socks["chat"]) {
    socks["chat"] = new SockJs(url);
  }
  if (!stomps["chat"]) {
    stomps["chat"] = StompJs.over(socks["chat"]);
  }

  return [stomps["chat"], disconnect,socks["chat"]];
};

export default useStomp;
