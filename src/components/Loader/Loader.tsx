import ClipLoader from "react-spinners/ClipLoader";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <ClipLoader size={60} /> 
    </div>
  );
}
