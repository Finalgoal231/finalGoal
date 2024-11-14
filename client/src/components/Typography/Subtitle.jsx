function Subtitle({ styleClass, children, onClick }) {
  return <div className={`text-2xl font-semibold ${styleClass}`} onClick={onClick}>{children}</div>;
}

export default Subtitle;
