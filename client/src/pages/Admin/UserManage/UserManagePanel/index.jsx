import { useEffect, useState } from "react";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import TitleCard from "../../../../components/Cards/TitleCard";
import StanSearchBar from "../../../../components/Input/StanSearchBar";
import { useSelector } from "react-redux";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const { users } = useSelector((state) => state.admin);
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
  }, [searchText]);

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

function UserManagePanel() {
  const { users } = useSelector((state) => state.admin);
  const [userData, setUserData] = useState(users);

  const removeFilter = () => {
    setUserData(users);
  };

  const applyFilter = (params) => {
    let filteredUserData = users.filter((t) => {
      return t.bio === params;
    });
    setUserData(filteredUserData);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredUserData = users.filter((t) => {
      return (
        t.username.toLowerCase().includes(value.toLowerCase()) ||
        t.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setUserData(filteredUserData);
  };

  return (
    <>
      <TitleCard
        title="User Manage Panel "
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Username</th>
                <th>Bio</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{k + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img src={l.avatar} alt="Avatar" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{l.name}</div>
                      </div>
                    </td>
                    <td>{l.username}</td>
                    <td>{l.bio}</td>
                    <td>{l.role}</td>
                    <td>
                      <div className="flex justify-center">
                        <Link to={"/admin/user/edit"}>
                          <button
                            type="button"
                            className="flex px-4 py-2 bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 text-[15px] text-white rounded-full cursor-pointer transition duration-300 ease-out"
                          >
                            <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
                            <div className="mt-[1px]">Edit</div>
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default UserManagePanel;
