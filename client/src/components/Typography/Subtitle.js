 function Subtitle({styleClass, children}){
    return(
        <div className={`text-2xl font-semibold ${styleClass}`}>{children}</div>
    )
}

export default Subtitle