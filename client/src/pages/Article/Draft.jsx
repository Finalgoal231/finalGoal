import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Toolbar from "../../features/dashboard/components/Toolbar";
import ArticleCard from "../../features/dashboard/components/ArticleCard";
import { useNavigate } from "react-router-dom";
const article = [
    {
        from: "master",
        avatar: "default.png",
        title: "What is redux?",
        content: "This is aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        createdAt: "2024-5-20",
    },
];
export default function Draft() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setHandleAddArticle = () => {
        navigate(`/newArticle/${0}`);
    };
    const setHandleSendArticle = () => {
        console.log("setHandleSendArticle");
    };
    useEffect(() => {
        dispatch(setPageTitle({ title: "Draft" }));
    }, []);
    return (
        <>
            <Toolbar onClick={setHandleAddArticle} />
            {article.map((v, i) => {
                return (
                    <div key={i}>
                        <ArticleCard
                            type={"draft"}
                            title={v.title}
                            avatar={v.avatar}
                            content={v.content}
                            date={v.createdAt}
                            from={v.from}
                            onSendClick={setHandleSendArticle}
                        />
                    </div>
                );
            })}
        </>
    );
}
