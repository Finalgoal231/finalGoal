import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import ArticleCard from "./components/ArticleCard";
import {
  getAArticles,
  deleteArticle,
  addFavourite,
  getHomeArticles,
} from "../../redux/articleSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const value = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getHomeArticles(user));
  }, [dispatch, value.isLoading]);

  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const setHandleCommentArticle = (index) => {
    dispatch(getAArticles(index));
    navigate(`/answerArticle/${index}`);
  };
  const onFavouriteClick = (index) => {
    dispatch(addFavourite({ id: index, from: user._id }));
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

  return (
    <>
      {/* <Toolbar onAddClick={setHandleAddArticle} /> */}
      {value.articles.map((v, i) => {
        return (
          <div key={i}>
            <ArticleCard
              title={v.title}
              avatar={v.from.avatar}
              content={v.content}
              date={v.createdAt}
              from={v.from.name}
              favouriteNum={v.favorite.length}
              onCommentClick={() => {
                setHandleCommentArticle(v._id);
              }}
              onFavouriteClick={() => {
                onFavouriteClick(v._id);
              }}
              onDeleteArticle={() => {
                setHandleDelete(v._id);
              }}
              onEditArticle={() => {
                setHandleEdit(v._id);
              }}
              show={false}
            />
          </div>
        );
      })}
    </>
  );
}

export default Dashboard;
