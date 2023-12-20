export const FilesListSkeleton = () => {
  return (
    <div className="bg-slate-300">
      <div className="grid md:grid-cols-3 grid-cols-2 animate-pulse">
        <FileCardSkeleton />
        <FileCardSkeleton />
        <FileCardSkeleton />
      </div>
    </div>
  );
};

const FileCardSkeleton = () => {
  return (
    <div className={"flex justify-center"}>
      <div className="w-60 h-100 m-10 bg-slate-300 border-2 border-slate-400 rounded-lg shadow-2xl">
        <div>
          <div className="w-60 h-60 flex justify-center items-center">
            <div className="bg-slate-600 animate-pulse h-52 w-48 rounded"></div>
            <div className="text-5xl text-pink-700 uppercase overflow-hidden"></div>
          </div>
        </div>

        <div className="flex items-center h-8 pl-2">
          <h6 className="truncate"></h6>
        </div>
        <div className=" text-gray-500 pl-2 text-sm"></div>
        <div className="flex flex-col items-center">
          <button className="options-btn m-2 h-11 w-24"></button>
          <button className="options-btn m-2 h-11 w-24"></button>
          <button className="options-btn m-2 h-11 w-24"></button>
          <button className="options-btn m-2 h-11 w-24"></button>
        </div>
      </div>
    </div>
  );
};
