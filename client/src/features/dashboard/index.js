import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Toolbar from "./components/Toolbar";
import ArticleCard from "./components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../../redux/articleSlice";
import { getAllArticles, getAArticles, deleteArticle } from "../../redux/articleSlice";
import { showNotification } from "../common/headerSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const value = useSelector((state) => state.article);
  const setHandleAddArticle = () => {
    navigate(`/newArticle/${0}`);
  };
  const setHandleAddAnswerArticle = (index) => {
    navigate(`/answer/article/${index}`);
  };
  const onFavouriteClick = () => {
    console.log("Favourite");
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
              content={v.content}
              date={v.createdAt}
              from={v.from}
              onAnswerClick={() => {
                setHandleAddAnswerArticle(v._id);
              }}
              onFavouriteClick={onFavouriteClick}
              onDeleteArticle={() => {
                setHandleDelete(v._id);
              }}
              onEditArticle={() => {
                setHandleEdit(v._id);
              }}
            />
          </div>
        );
      })}
    </>
  );
}

export default Dashboard;
