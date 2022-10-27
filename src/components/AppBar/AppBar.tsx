import React from "react";

const SaveButton = () => (
  <button className="border-2 border-white rounded-md bg-purple-600 py-3 px-4 my-2 mx-8 shadow active:scale-95">
    <div className="font-bold text-white">Save Changes</div>
  </button>
);

const AppBar = () => {
  return (
    <div className="w-full sticky top-0 bg-slate-500 grid auto-cols-fr shadow-md z-[2000]">
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
        <SaveButton />
      </div>
    </div>
  );
};

export default AppBar;
