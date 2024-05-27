import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import {
  getAllArticles,
  getAArticles,
  deleteArticle,
  addFavourite,
  getMyArticles,
} from "../../redux/articleSlice";
import {
  showNotification,
  setPageTitle,
} from "../../features/common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function ShowArticle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { article } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getAArticles(id));
    dispatch(setPageTitle({ title: "My Article" }));
  }, []);
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
    navigate(`/newArticle/${index}`);
  };
  // useEffect(() => {
  //   dispatch(getMyArticles({ from: user._id }));
  //   if (article.isLoading)
  //     dispatch(showNotification({ message: article.message, status: 1 }));
  // }, [dispatch, user._id, article.isLoading, article.message]);
  console.log(article);
  return (
    <>
      {article.length !== 0 && (
        <div className="flex flex-col items-end">
          <ArticleCard
            type={"answer"}
            title={article.title}
            avatar={article.from.avatar}
            favouriteNum={article.favorite.length}
            content={article.content}
            date={article.createdAt}
            from={article.from.name}
          />
          {article.comment.length ? (
            article.comment.map((v, i) => {
              return (
                <div key={i} className="flex flex-col w-4/5">
                  <ArticleCard
                    title={v.ans.title}
                    avatar={v.ans.from.avatar}
                    favouriteNum={v.ans.favorite.length}
                    content={v.ans.content}
                    date={v.ans.createdAt}
                    from={v.ans.from.name}
                    onFavouriteClick={() => {
                      onFavouriteArticle(v.ans._id);
                    }}
                    onDeleteArticle={() => {
                      setHandleDelete(v.ans._id);
                    }}
                    onEditArticle={() => {
                      setHandleEdit(v.ans._id);
                    }}
                    onCommentClick={() => {
                      setHandleCommentArticle(v.ans._id);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-[50px] text-red-500">No Data</div>
          )}
        </div>
      )}
    </>
  );
}

export default ShowArticle;
