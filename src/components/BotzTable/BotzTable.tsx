import React from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import { BotzListener } from "../../firebase/AdminFirebaseListeners/botzListeners";
import { useAppSelector } from "../../Store/hooks";
import { botzList } from "../../Store/Selectors";
import { ITankBot } from "../../Models/Bots";
import "./BotzTable.scss";
import { Button } from "primereact/button";
const botsListener = new BotzListener();

export const BotzTable = () => {
  const botz = useAppSelector(botzList);
  const navigate = useNavigate();

  const imageBody = (bot: ITankBot) => {
    return <img style={{ maxHeight: "20vh", padding: "0px" }} src={bot.mainPhotoUrl} alt="tankbot"></img>;
  };

  const getStatus = (bot: ITankBot) => {
    return (
      <div style={{ maxWidth: "40%" }} className="flex flex-column">
        <Tag
          className="mb-1"
          severity={bot.status === true ? "success" : "danger"}
          value={bot.status === true ? "online" : "offline"}
        ></Tag>
      </div>
    );
  };

  const buttonGroup = (bot: ITankBot) => {
    //disabled={!bot.status.driver || !bot.status.turret}
    return (
      <span className="p-buttonset">
        <Button label="Edit" icon="pi pi-check" />
        <Button label="Delete" icon="pi pi-trash" />
        <Button onClick={() => navigate(`/tankcockpit/${bot.botId}`)} label="Connect" icon="pi pi-video" />
      </span>
    );
  };

  return (
    <div className="card">
      <DataTable className="tableCss" value={botz} tableStyle={{ minWidth: "50rem" }}>
        <Column field="botId" header="botId"></Column>
        <Column field="botName" header="botName"></Column>
        <Column field="players" header="No of Players"></Column>
        <Column field="sessionId" header="sessionId"></Column>
        <Column body={imageBody}></Column>
        <Column body={getStatus} header="Status"></Column>
        <Column body={buttonGroup}> </Column>
      </DataTable>
    </div>
  );
};
