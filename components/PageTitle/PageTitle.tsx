import './styles.css';

type Props = {
  title: string;
  titleClasses?: string;
  underlineClasses?: string;
}
const PageTitle = ({ title, titleClasses, underlineClasses }: Props) => {
  return (
    <div className="w-fit mb-4 group z-[1]">
      <h1 className={`mb-2 mr-10 select-none heading ${titleClasses}`}>
        {title}
      </h1>
      <div className={`border-b-4 w-[40px] group-hover:w-full transition-all ease-ine-out duration-1000 ${underlineClasses}`}></div>
    </div>
  );
};

export default PageTitle;
