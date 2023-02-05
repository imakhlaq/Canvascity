"use client";

import { useDraw } from "../hooks/useDraw";
import { useEffect, useState } from "react";
import Header from "./header";
import { io } from "socket.io-client";
import { drawLine } from "@/utils/drawLine";
import { Socket } from "dgram";
const socket = io("http://localhost:3001");

type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

const Page = () => {
  const [color, setColor] = useState<string>("#000");
  const [showPallet, setShowPallet] = useState(false);
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  //for web socket event listning
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    //for when a client first time connects
    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      console.log("sending canvas state");
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });
    //when client connects for the first time
    socket.on("canvas-state-from-server", (state: string) => {
      console.log("dadadadadad");

      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color, setShowPallet });
      }
    );
    socket.on("clear", clear);

    return () => {
      //clean upp the sockets
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    };
  }, [canvasRef, clear]);

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color, setShowPallet });
  }

  return (
    <div className="space-y-10 flex flex-col justify-center">
      <Header
        color={color}
        setColor={setColor}
        clear={clear}
        setShowPallet={setShowPallet}
        showPallet={showPallet}
      />
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={width - 10}
        height={height - 130}
        className="border border-black rounded-md bg-[#F9F5E7]"
      />
    </div>
  );
};
export default Page;
