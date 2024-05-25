function Logo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full bg-base-200 rounded-xl">
      <div className=" py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-semibold mb-2">TODO</h1>
          <img
            src="./assets/images/photo_2024-03-20_14-41-42.jpg"
            alt=""
            className="w-48 mt-12 rounded-3xl"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Logo;
