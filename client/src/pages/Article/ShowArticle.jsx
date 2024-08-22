import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import {
  getAArticles,
  deleteArticle,
  addFavourite,
} from "../../redux/articleSlice";
import {
  showNotification,
  setPageTitle,
} from "../../features/common/headerSlice";
import { socketEmit } from "../../containers/Layout";
import { NotificationManager } from "react-notifications";
// import { setIsLoading } from "../../redux/articleSlice";

function ShowArticle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { article } = useSelector((state) => state.article);
  const { flag } = useSelector((state) => state.article);
  // console.log(flag);
  useEffect(() => {
    dispatch(getAArticles(id));
    dispatch(setPageTitle({ title: "Show Article" }));
  }, [dispatch, id]);
  const onFavouriteArticle = (index) => {
    dispatch(addFavourite({ index, from: user._id })).then(() =>
      NotificationManager.success(
        `You favourite to ${user.username}`,
        "SUCCESS"
      )
    );
  };
  useEffect(() => {
    if (flag) {
      socketEmit("like", {
        author: article.from.name,
        msg: `${article.from.name} liked your Article-${article.title}`,
      });
      socketEmit("comment", {
        author: user.username,
        msg: `${user.username} commented on your Article`,
      });
    }
  }, [article.from.name, article.title, flag, user.username]);
  const setHandleCommentArticle = (index) => {
    dispatch(getAArticles(index));
    navigate(`/answerArticle/${index}`);
  };
  const setHandleDelete = (index) => {
    if (user.role !== "user") {
      if (window.confirm("Are you delete this Article?")) {
        dispatch(deleteArticle(index));
      }
    } else
      NotificationManager.warning(
        "You are user. You don't delete Article",
        "Warning"
      );
  };
  const setHandleEdit = (index) => {
    navigate(`/newArticle/${index}`);
  };
  useEffect(() => {
    // dispatch(getMyArticles({ from: user._id }));
    if (article.isLoading)
      dispatch(showNotification({ message: article.message, status: 1 }));
  }, [dispatch, user._id, article.isLoading, article.message]);
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
            onFavouriteClick={() => {
              onFavouriteArticle(article._id);
            }}
            onDeleteArticle={() => {
              setHandleDelete(article._id);
            }}
            onEditArticle={() => {
              setHandleEdit(article._id);
            }}
            onCommentClick={() => {
              setHandleCommentArticle(article._id);
            }}
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
