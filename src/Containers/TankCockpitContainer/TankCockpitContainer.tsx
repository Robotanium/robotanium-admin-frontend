import React from "react";
import { TankCockpit } from "../../components/";
import { useParams } from "react-router-dom";

export const TankCockpitContainer = () => {
  const params = useParams<string>();

  return <TankCockpit botId={params.botId ?? ""} />;
};
