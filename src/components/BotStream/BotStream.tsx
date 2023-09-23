import React, { useEffect, useState } from "react";
import { Session } from "@opentok/client";
import "./BotStream.scss";
const OT = require("@opentok/client");

interface botStream {
  accessToken: string;
  sessionId: string;
}
const apiKey = process.env.REACT_APP_OPENTOK_API_KEY;

export const BotStream: React.FC<botStream> = ({ accessToken, sessionId }) => {
  const [session, setSession] = useState<Session | null>(null);

  function handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  const setListener = () => {
    if (!session) return;
    session.on("streamCreated", (event) => {
      session
        .subscribe(event.stream, "subscriber", {
          width: "100%",
          height: "100%",
          //insertDefaultUI:false,
        })
    });

    session.connect(accessToken, (error: any) => {
      if (error) {
        handleError(error);
      }
    });
  };

  useEffect(() => {
    setSession(OT.initSession(apiKey, sessionId));
  }, [sessionId]);

  useEffect(() => {
    if (session) return setListener();
  }, [session]);

  return (
    <div className=" testname h-full">
      <div className="subscriber h-full" id="subscriber"></div>
    </div>
  );
};
