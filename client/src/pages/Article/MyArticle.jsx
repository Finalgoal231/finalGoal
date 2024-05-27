import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import { getAllArticles, getAArticles, deleteArticle, addFavourite } from "../../redux/articleSlice";
import { showNotification, setPageTitle } from "../../features/common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function AllArticle() {
  useEffect(() => {
    dispatch(setPageTitle({ title: "My Article" }));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const value = useSelector((state) => state.article);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const onFavouriteArticle = (index) => {
    dispatch(addFavourite({ id: index, from: userId }));
  };
  const setHandleCommentArticle = (index) => {
    dispatch(getAArticles(index));
    navigate(`/answerArticle/${index}`);
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
    dispatch(getAllArticles({ from: userId }));
    if (value.isLoading) dispatch(showNotification({ message: value.message, status: 1 }));
  }, [dispatch, value.isLoading, value.message]);

  return (
    <>
      <Toolbar onAddClick={setHandleAddArticle} />
      {value.article.length ? (
        value.article.map((v, i) => {
          return (
            <div key={i}>
              <ArticleCard
                title={v.title}
                avatar={v.from.avatar}
                favouriteNum={v.favorite.length}
                content={v.content}
                date={v.createdAt}
                from={v.from.name}
                onFavouriteClick={() => {
                  onFavouriteArticle(v._id);
                }}
                onDeleteArticle={() => {
                  setHandleDelete(v._id);
                }}
                onEditArticle={() => {
                  setHandleEdit(v._id);
                }}
                onCommentClick={() => {
                  setHandleCommentArticle(v._id);
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

export default AllArticle;
