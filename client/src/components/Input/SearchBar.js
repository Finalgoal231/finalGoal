function SearchBar({ searchText, onChange, className }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="relative flex flex-wrap items-stretch w-full ">
        <input
          type="search"
          value={searchText}
          placeholder={"Search..."}
          onChange={onChange}
          className="input input-md input-bordered rounded-md w-full max-w-xs"
        />
      </div>
    </div>
  );
}

export default SearchBar;
