import { Dispatch, SetStateAction } from "react";
import { ChromePicker } from "react-color";

type Props = {
  setColor: Dispatch<SetStateAction<string>>;
  color: string;
  clear: () => void;
  setShowPallet: Dispatch<SetStateAction<boolean>>;
  showPallet: boolean;
};

const Header = ({
  setColor,
  color,
  clear,
  showPallet,
  setShowPallet,
}: Props) => {
  return (
    <div className="bg-[#20262E] px-3 py-4 flex gap-10 justify-between select-none">
      <div>
        <h1 className="text-3xl font-semibold text-white">Canvascity</h1>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div
          onClick={() => setShowPallet((show) => !show)}
          style={{ background: color }}
          className={`w-8 h-8 rounded-full cursor-pointer relative shadow-xl border`}
        ></div>
        {showPallet && (
          <div className="absolute top-24 right-20">
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          </div>
        )}
        <button
          type="button"
          onClick={clear}
          className="px-10 py-2 rounded-lg border bg-white shadow-xl text-lg font-semibold select-none"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
export default Header;
