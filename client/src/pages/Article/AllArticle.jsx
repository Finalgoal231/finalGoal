/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
function AllArticle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    useEffect(() => {
        dispatch(setPageTitle({ title: "All Article" }));
    }, []);
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
export default AllArticle;
