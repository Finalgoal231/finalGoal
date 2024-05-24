function ErrorText({children, Style}) {
    return ( 
        <p className={`text-center text-error ${Style}`}>{children}</p>
     );
}

export default ErrorText;