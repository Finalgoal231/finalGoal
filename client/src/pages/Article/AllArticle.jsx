import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import {
  getAllArticles,
  getAArticles,
  deleteArticle,
  addFavourite,
} from "../../redux/articleSlice";
import { setPageTitle } from "../../features/common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function AllArticle() {
  useEffect(() => {
    dispatch(setPageTitle({ title: "All Article" }));
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.auth);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const onFavouriteArticle = (index, from) => {
    dispatch(addFavourite({ index, from: user._id }));
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
  }, [dispatch, value.isLoading, value.message]);

  return (
    <>
      <Toolbar onAddClick={setHandleAddArticle} />
      {value.article.length &&
        value.article.map((v, i) => {
          console.log(v);
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
                  onFavouriteArticle(v._id, v.from._id);
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
