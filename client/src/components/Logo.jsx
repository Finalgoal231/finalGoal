function Logo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full bg-base-200 rounded-xl">
      <div className=" py-12">
        <div className="max-w-md flex flex-col justify-center items-center">
          <h1 className="text-6xl text-center font-semibold mb-2 signHead">Blog Website</h1>
          <img
            src="default.jpg"
            alt=""
            className="w-48 mt-6 rounded-3xl"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Logo;
