import { ActivationState, Client } from "@stomp/stompjs";
import { useCallback } from "react";

const clients: { [key: string]: Client } = {};

const useStomp = (type: string): [Client | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (clients[type]) {
      clients[type].deactivate().then().catch();
      delete clients[type];
    }
  }, [type]);

  if (!clients[type]) {
    clients[type] = new Client({
      brokerURL: `ws://localhost:3000/ws/${type}`,
      debug: (msg) => console.log(msg),
      reconnectDelay: 3000,
      connectionTimeout: 5000,
    });
    clients[type].onConnect = (frame) => {
      console.log(frame.body);
    };
    clients[type].onStompError = (receipt) => {
      console.log(receipt.body);
    };
    clients[type].activate();
    console.log(ActivationState[clients[type].state]);
  }

  return [clients[type], disconnect];
};

export default useStomp;
