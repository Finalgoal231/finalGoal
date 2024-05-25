import { useCallback, useEffect, useState } from "react";
import { users } from "../../UserManage/UserManagePanel/Userdata";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { editCategory } from "../../../../redux/adminSlice";

function TableCategory() {
  const [userData, setUserData] = useState(users);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);

  // const get = useCallback((val) => {
  //   dispatch(getCategory({getId:val}));
  // }, [dispatch]);

  // const delete = useCallback((val) => {
  //   dispatch(deleteCategory({delId:val}));
  // }, [dispatch]);
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((l, k) => {
              return (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>
                    <div>
                      <div className="font-bold">{l.title}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-6">
                      <button
                        type="button"
                        className="flex px-4 py-2 bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 text-[15px] text-white rounded-full cursor-pointer transition duration-300 ease-out"
                      >
                        <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
                        <div className="mt-[1px]">Edit</div>
                      </button>
                      <button
                        type="button"
                        className="flex px-3 py-2 bg-red-500 hover:bg-red-600 dark:hover:bg-slate-400 text-[15px] text-white rounded-full cursor-pointer transition duration-300 ease-out"
                      >
                        <BiSolidTrashAlt className="text-[21px] mt-[2px] mr-[3px]" />

                        <div className="mt-[1px]">Delete</div>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableCategory;
