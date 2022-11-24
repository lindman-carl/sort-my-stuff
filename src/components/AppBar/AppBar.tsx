import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type SaveButtonProps = {
  onClick: () => void;
};

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="border-2 border-white rounded-md bg-purple-600 py-3 px-4 my-2 mx-8 shadow active:scale-95"
  >
    <div className="font-bold text-white">Save Changes</div>
  </button>
);

export enum LoadingState {
  "failed",
  "loading",
  "success",
}

type LoadingIndicatorProps = {
  loadingState: LoadingState;
  height?: number;
  width?: number;
  color?: string;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  loadingState: currentLoadingState,
  height = 24,
  width = 24,
  color = "#fff",
}) => {
  const renderSvg = (loadingState: LoadingState) => {
    switch (loadingState) {
      case LoadingState.loading:
        return (
          <Image
            src={"/tail-spin.svg"}
            alt={"loading"}
            height={height}
            width={width}
          />
        );
      case LoadingState.success:
        return (
          <Image
            src={"/check-mark.svg"}
            alt={"success"}
            height={height}
            width={width}
            style={{ fill: color }}
          />
        );
      case LoadingState.failed:
        return (
          <Image src={"x.svg"} alt={"failed"} height={height} width={width} />
        );
      default:
        throw new Error(`Unexpected LoadingState: ${loadingState}`);
    }
  };

  return (
    <div className="w-12 h-12 border rounded flex justify-center items-center">
      {renderSvg(currentLoadingState)}
    </div>
  );
};

type AppBarProps = {
  loadingState: LoadingState;
};

const AppBar: React.FC<AppBarProps> = ({ loadingState }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full sticky top-0 bg-slate-500 grid auto-cols-fr shadow-md z-[2000]">
      {session && (
        <div className="col-start-1 col-span-1">
          <button
            onClick={() => signOut()}
            className="border rounded px-2 py-1"
          >
            Sign out
          </button>
        </div>
      )}
      <div className="col-start-2 col-span-1">
        <header className="w-full h-full flex justify-center items-center text-center font-extrabold text-white text-2xl">
          Sort my&nbsp;
          <del className="text-slate-300 decoration-slate-900 decoration-4">
            &nbsp;shit&nbsp;
          </del>
          &nbsp;stuff
        </header>
      </div>
      <div className="col-start-3 col-span-1 justify-self-end">
        <LoadingIndicator loadingState={loadingState} />
      </div>
    </div>
  );
};

export default AppBar;
