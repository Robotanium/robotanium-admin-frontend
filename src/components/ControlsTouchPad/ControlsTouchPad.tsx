import React, { useRef, useState, useEffect } from "react";
import { tankSteeringInterface, controlPadDirections } from "../../Models";
import "./controlsTouchPad.scss";

interface controlPad {
  onControlsChange: (controls: tankSteeringInterface) => void;
}

export const ControlPad: React.FC<controlPad> = (props) => {
  const [controlsOn, setControlsOn] = useState<boolean>();
  const [speed, setSpeed] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const controlsClass = controlsOn ? "control-pad-on" : "control-pad-off";

  const controlPadRef = useRef<HTMLDivElement>(null);
  const controlPadPositions = controlPadRef.current?.getBoundingClientRect();
  const leftPosition = controlPadPositions?.left ?? 0;
  const upPosition = controlPadPositions?.top ?? 0;
  const diameter = controlPadPositions?.width ?? 0;
  const radius = diameter / 2;
  const onePercent = radius / 100;
  const centerY = upPosition + radius;
  const centerX = leftPosition + radius;

  const getAdjacentSide = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections): number => {
    if (direction === "forwardRight" || direction === "backRight") return (event.clientX - centerX) / onePercent;

    return (centerX - event.clientX) / onePercent;
  };

  const getOppositeSide = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections): number => {
    if (direction === "forwardRight" || direction === "forwardLeft" || direction === "moveForward")
      return (centerY - event.clientY) / onePercent;
    if (direction === "backLeft" || direction === "backRight" || direction === "moveBack")
      return (event.clientY - centerY) / onePercent;
    return 0;
  };

  const calcDirection = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections) => {
    const adjacentSide = getAdjacentSide(event, direction);
    const oppositeSide = getOppositeSide(event, direction);
    const hypotenuse = Math.round(Math.sqrt(adjacentSide ** 2 + oppositeSide ** 2));
    const angle = Math.round((Math.atan(oppositeSide / adjacentSide) * 180) / Math.PI);
    setSpeed(hypotenuse);
    props.onControlsChange({ direction, angle, speed: hypotenuse });
  };

  const handleSteeringMouseMove = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections) => {
    if (!controlsOn || !mouseDown) return;
    calcDirection(event, direction);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, direction: controlPadDirections) => {
    if (!controlsOn) return;
    calcDirection(event, direction);
    setMouseDown(true);
  };
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false);
    props.onControlsChange({ direction: "stop", angle: 0, speed: 0 });
  };

  useEffect(() => {
    if (!controlsOn) {
      props.onControlsChange({ direction: "stop", angle: 0, speed: 0 });
    }
  }, [controlsOn]);

  return (
    <div ref={controlPadRef} className={`controls-pad-container ${controlsClass}`} onMouseLeave={() => setControlsOn(false)}>
      <div
        className={`controls-pad-forward ${controlsClass}`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "moveForward")}
        onMouseDown={(event) => handleMouseDown(event, "moveForward")}
      ></div>
      <div
        className={`controls-pad-turn-up-right`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "forwardRight")}
        onMouseDown={(event) => handleMouseDown(event, "forwardRight")}
      ></div>
      <div
        className={`controls-pad-spin-right ${controlsClass}`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "spinRight")}
        onMouseDown={(event) => handleMouseDown(event, "spinRight")}
      ></div>
      {speed}
      <div
        className={`controls-pad-turn-down-right`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "backRight")}
        onMouseDown={(event) => handleMouseDown(event, "backRight")}
      ></div>
      <div
        className={`controls-pad-back ${controlsClass}`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "moveBack")}
        onMouseDown={(event) => handleMouseDown(event, "moveBack")}
      ></div>
      <div
        className={`controls-pad-turn-down-left`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "backLeft")}
        onMouseDown={(event) => handleMouseDown(event, "backLeft")}
      ></div>
      <div
        className={`controls-pad-spin-left ${controlsClass}`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "spinLeft")}
        onMouseDown={(event) => handleMouseDown(event, "spinLeft")}
      ></div>
      <div
        className={`controls-pad-turn-up-left`}
        onMouseUp={handleMouseUp}
        onMouseMove={(event) => handleSteeringMouseMove(event, "forwardLeft")}
        onMouseDown={(event) => handleMouseDown(event, "forwardLeft")}
      ></div>
      <div className={`controls-pad-center ${controlsClass}`} onClick={() => setControlsOn(!controlsOn)}></div>
    </div>
  );
};
