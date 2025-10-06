function TwoButtons({ children, className }) {
  return <div className={`flex flex-col md:flex-row self-stretch items-center gap-4 ${className}`}>{children}</div>;
}
export default TwoButtons;
