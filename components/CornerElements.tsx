const CornerElements = () => {
    return (
      <>
        <div className="flex absolute left-[-10px] top-[-10px] w-16 h-16 border-l-2 border-t-2 border-green-700 "></div>
            <div className="flex absolute top-[-10px] right-[-10px] w-16 h-16 border-r-2 border-t-2 border-green-700"></div>
            <div className="flex absolute bottom-[-10px] left-[-10px] w-16 h-16 border-l-2 border-b-2 border-green-700"></div>
            <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 border-r-2 border-b-2 border-green-700"></div>
      </>
    );
  };
  export default CornerElements;