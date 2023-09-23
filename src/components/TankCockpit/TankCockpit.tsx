import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { fetchCredentialsAttempt } from "../../Store/Reducers";
import { getSessionCredentials, userState } from "../../Store/Selectors";
import { ControlPad } from "../../components/";
import { BotStream } from "../BotStream/BotStream";
import "./TankCockpit";
import { tankSteeringInterface } from "../../Models";
import { socketConnection } from "../../socket.ts/socket.connections";

export interface ITankCockpit {
  botId: string;
}

export const TankCockpit: React.FC<ITankCockpit> = ({ botId }) => {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(getSessionCredentials);

  const userToken = useAppSelector(userState).user?.idToken;

  const getCredentials = () => {
    if (!credentials.accessToken) return dispatch(fetchCredentialsAttempt({ botId, sessionId: credentials.sessionId ?? "" }));
  };

  useEffect(() => {
    socketConnection.connectToBot(userToken ?? "", botId);
    getCredentials();
  }, [credentials.accessToken]);

  const handleControlsChange = (controls: tankSteeringInterface) => {
    socketConnection.sendControls(controls, userToken ?? "", botId);
  };

  return (
    <div className="testclass card h-full">
      <ControlPad onControlsChange={handleControlsChange} />

      {credentials.accessToken && credentials.sessionId && (
        <BotStream accessToken={credentials.accessToken} sessionId={credentials.sessionId} />
      )}

      {botId}
    </div>
  );
};
