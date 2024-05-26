import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Toolbar from "./components/Toolbar";
import ArticleCard from "./components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { getAllArticles } from "../../redux/articleSlice";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllArticles);
    }, [dispatch]);

    // const [article, setArticle] = useState(null);
    const { article } = useSelector((state) => state.article);
    const setHandleAddArticle = () => {
        navigate(`/newArticle/${0}`);
    };
    const setHandleAddAnswerArticle = (index) => {
        navigate(`/answer/article/${index}`);
    };
    const onFavouriteClick = () => {
        console.log("Favourite");
    };
    return (
        <>
            <Toolbar onAddClick={setHandleAddArticle} />
            {article.map((v, i) => {
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
                        />
                    </div>
                );
            })}
        </>
    );
}

export default Dashboard;
