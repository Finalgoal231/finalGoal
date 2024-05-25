function NotificationBodyRightDrawer() {
    return (
        <>
            {[...Array(5)].map((_, i) => {
                return (
                    <div
                        key={i}
                        className={"grid mt-3 card bg-base-200 rounded-box p-3" + (i < 5 ? " bg-blue-100" : "")}
                    >
                        {i % 2 === 0 ? `Jane commented your Article` : `Smith mentioned your name in his Article `}
                    </div>
                );
            })}
        </>
    );
}

export default NotificationBodyRightDrawer;
