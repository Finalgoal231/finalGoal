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
    dispatch(setPageTitle({ title: "All Article" }));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const value = useSelector((state) => state.article);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const onFavouriteArticle = (index) => {
    dispatch(addFavourite(index));
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
    dispatch(getAllArticles());
    if (value.isLoading) dispatch(showNotification({ message: value.message, status: 1 }));
  }, [dispatch, value.isLoading, value.message]);

  return (
    <>
      <Toolbar onAddClick={setHandleAddArticle} />
      {value.article.map((v, i) => {
        return (
          <div key={i}>
            <ArticleCard
              title={v.title}
              avatar={v.avatar}
              favouriteNum={v.favorite.length}
              content={v.content}
              date={v.createdAt}
              from={v.from}
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
      })}
    </>
  );
}

export default AllArticle;
