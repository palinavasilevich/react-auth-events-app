import cls from "./Loader.module.css";

function Loader() {
  return (
    <div className={cls.backdrop}>
      <span className={cls.loader}></span>;
    </div>
  );
}

export default Loader;
