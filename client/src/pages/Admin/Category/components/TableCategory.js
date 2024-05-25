import { useCallback } from "react";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory } from "../../../../redux/adminSlice";

function TableCategory() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);

  const get = useCallback(
    (val) => {
      dispatch(getCategory({ val }));
    },
    [dispatch]
  );

  const del = useCallback(
    (id) => {
      dispatch(deleteCategory({ _id: id }));
    },
    [dispatch]
  );
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
            {categories.map((item, k) => {
              return (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>
                    <div>
                      <div className="font-bold">{item.title}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-6">
                      <button
                        type="button"
                        onClick={() => get(item)}
                        className="flex px-4 py-2 bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 text-[15px] text-white rounded-full cursor-pointer transition duration-300 ease-out"
                      >
                        <BiSolidEditAlt className="text-[21px] mt-[2px] mr-[3px]" />
                        <div className="mt-[1px]">Edit</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => del(item._id)}
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
