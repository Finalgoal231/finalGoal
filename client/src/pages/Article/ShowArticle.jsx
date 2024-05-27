import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import { getAllArticles, getAArticles, deleteArticle, addFavourite, getMyArticles } from "../../redux/articleSlice";
import { showNotification, setPageTitle } from "../../features/common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function MyArticle() {
  useEffect(() => {
    dispatch(setPageTitle({ title: "My Article" }));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const value = useSelector((state) => state.article);

  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const onFavouriteArticle = (index) => {
    dispatch(addFavourite({ id: index, from: user._id }));
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
    dispatch(getMyArticles({ from: user._id }));
    if (value.isLoading) dispatch(showNotification({ message: value.message, status: 1 }));
  }, [dispatch, user._id, value.isLoading, value.message]);

  return (
    <>
      <div className="flex flex-col items-end">
        <ArticleCard
          type={"answer"}
          title={value.selected.title}
          avatar={value.selected.from.avatar}
          favouriteNum={value.selected.favorite.length}
          content={value.selected.content}
          date={value.selected.createdAt}
          from={value.selected.from.name}
        />
        {value.selected.ans.length ? (
          value.selected.ans.map((v, i) => {
            return (
              <div key={i} className="flex flex-col w-4/5">
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
      </div>
    </>
  );
}

export default MyArticle;
