import { Dispatch, SetStateAction } from "react";

type DrawLineProps = Draw & {
  color: string;
  setShowPallet: Dispatch<SetStateAction<boolean>>;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  color,
  setShowPallet,
}: DrawLineProps) => {
  setShowPallet(false);
  const { x: currX, y: currY } = currentPoint;

  const lineColor = color;

  const lineWidth = 5;

  let startingPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startingPoint.x, startingPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startingPoint.x, startingPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};
