function Logo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full bg-base-200 rounded-xl">
      <div className=" py-12">
        <div className="max-w-md flex flex-col justify-center items-center">
          <img
            src="./assets/images/avatar.jpg"
            alt=""
            className="w-64 rounded-3xl"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Logo;
