import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import {
  getAArticles,
  deleteArticle,
  updateArticle,
  getDraftArticles,
} from "../../redux/articleSlice";
import {
  showNotification,
  setPageTitle,
} from "../../features/common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function DraftArticle() {
  useEffect(() => {
    dispatch(setPageTitle({ title: "Draft Article" }));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const value = useSelector((state) => state.article);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const setHandleSendArticle = (data) => {
    dispatch(updateArticle({ ...data, complete: true }));
  };
  const setHandleDelete = (index) => {
    if (window.confirm("Are you delete this Article?")) {
      dispatch(deleteArticle(index));
    }
  };
  const setHandleEdit = (index) => {
    dispatch(getAArticles(index));
    navigate(`/newArticle/${index}`);
  };
  useEffect(() => {
    dispatch(getDraftArticles({ from: user._id }));
    if (value.isLoading)
      dispatch(showNotification({ message: value.message, status: 1 }));
  }, [dispatch, value.isLoading, value.message]);

  return (
    <>
      <Toolbar onAddClick={setHandleAddArticle} />
      {value.articles.length ? (
        value.articles.map((v, i) => {
          return (
            <div key={i}>
              <ArticleCard
                type={"draft"}
                title={v.title}
                avatar={v.from.avatar}
                favouriteNum={v.favorite.length}
                content={v.content}
                date={v.createdAt}
                from={v.from.name}
                onDeleteArticle={() => {
                  setHandleDelete(v._id);
                }}
                onEditArticle={() => {
                  setHandleEdit(v._id);
                }}
                onSendClick={() => {
                  setHandleSendArticle(v);
                }}
              />
            </div>
          );
        })
      ) : (
        <div className="text-[50px] text-red-500">No Data</div>
      )}
    </>
  );
}

export default DraftArticle;
