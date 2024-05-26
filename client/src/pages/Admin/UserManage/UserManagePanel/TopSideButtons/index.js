import { useEffect, useState } from "react";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import StanSearchBar from "../../../../../components/Input/StanSearchBar";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch, users }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const bioFilters = users.map((item, index) => {
    return item.bio;
  });

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText, users]);

  return (
    <div className="inline-block float-right">
      <StanSearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {bioFilters.map((l, k) => {
            return (
              <li key={k}>
                <div onClick={() => showFiltersAndApply(l)}>{l}</div>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <div onClick={() => removeAppliedFilter()}>Remove Filter</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopSideButtons;
