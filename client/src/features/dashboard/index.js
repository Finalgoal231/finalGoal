import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import ArticleCard from "./components/ArticleCard";
import { getAllArticles, getAArticles, deleteArticle, addFavourite } from "../../redux/articleSlice";
import { showNotification } from "../common/headerSlice";
// import { setIsLoading } from "../../redux/articleSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const value = useSelector((state) => state.article);
  const { user } = useSelector((state) => state.auth);
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
  useEffect(() => {
    dispatch(getAllArticles());
    // dispatch(setIsLoading(false));
  }, [dispatch, value.isLoading]);

  return (
    <>
      <Toolbar onAddClick={setHandleAddArticle} />
      {value.article.map((v, i) => {
        return (
          <div key={i}>
            <ArticleCard
              title={v.title}
              avatar={v.from.avatar}
              content={v.content}
              date={v.createdAt}
              from={v.from.name}
              favouriteNum={v.favorite.length}
              onAnswerClick={() => {
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
            />
          </div>
        );
      })}
      {user.token ? (
        <div className="text-center mt-4">
          Already Have An Account?{" "}
          <Link to="/signin">
            <span className="text-[20px] inline-block hover:text-primary underline hover:cursor-pointer transition duration-200">
              Signin
            </span>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;
