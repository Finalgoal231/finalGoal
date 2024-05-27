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
  setSearchVal,
  setSortIndex,
  setCategoryIndex,
} from "../../redux/articleSlice";
import { setPageTitle } from "../../features/common/headerSlice";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// import { socketEmit } from "../../containers/Layout";
// import { setIsLoading } from "../../redux/articleSlice";

function AllArticle() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "All Article" }));
  }, [dispatch]);
  const navigate = useNavigate();
  const value = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.auth);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const setShowArticle = (index) => {
    dispatch(getAArticles(index));
    navigate(`/showArticle/${index}`);
  };
  const onFavouriteArticle = (index, from) => {
    dispatch(addFavourite({ index, from: user._id })).then(() => {
      NotificationManager.success(`You favourited ${user.username}'s article`);
    });
  };

  const setHandleCommentArticle = (index) => {
    dispatch(getAArticles(index));
    navigate(`/answerArticle/${index}`);
  };
  const setHandleDelete = (index) => {
    if (user.roll !== "user") {
      if (window.confirm("Are you delete this Article?")) {
        dispatch(deleteArticle(index));
      }
    } else alert("You can't delete other articles, Now your role is user");
  };
  const setHandleEdit = (index) => {
    if (user.roll !== "user") {
      dispatch(getAArticles(index));
      navigate(`/newArticle/${index}`);
    } else alert("You can't edit other articles, Now your role is user");
  };
  const setHandleSearchVal = (e) => {
    dispatch(setSearchVal(e.target.value));
  };
  const setHnadleSortIndex = (e) => {
    dispatch(setSortIndex(e.target.value));
  };
  const setHanldeCategoryIndex = (e) => {
    dispatch(setCategoryIndex(e.target.value));
  };
  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch, value.isLoading, value.message]);

  return (
    <>
      <Toolbar
        setSortIndex={setHnadleSortIndex}
        setCategoryIndex={setHanldeCategoryIndex}
        setSearchval={setHandleSearchVal}
        onAddClick={setHandleAddArticle}
      />
      {value.articles.length > 0 ? (
        value.articles.map((v, i) => {
          return v.parent == null ? (
            <div key={i}>
              <ArticleCard
                title={v.title}
                avatar={v.from.avatar}
                favouriteNum={v.favorite.length}
                content={v.content}
                date={v.createdAt}
                from={v.from.name}
                id={v.from._id}
                onFavouriteClick={() => {
                  onFavouriteArticle(v._id, v.from._id);
                }}
                setShowArticle={() => {
                  setShowArticle(v._id);
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
          ) : (
            <div key={i}></div>
          );
        })
      ) : (
        <div className="text-[50px] text-red-500">No Data</div>
      )}
    </>
  );
}

export default AllArticle;
