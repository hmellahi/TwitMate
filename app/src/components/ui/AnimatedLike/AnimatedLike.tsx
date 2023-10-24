import { useEffect, useMemo, useState } from "react";
import "./AnimatedLike.css";

export default function AnimatedLike({
  value,
  onClickHandler,
}: {
  value: boolean;
  onClickHandler: Function;
}) {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // After the component is mounted, set firstLoad to false
    setFirstLoad(false);
  }, []);

  let classes = useMemo(() => {
    let divClasses = "heart";
    if (value) {
      if (!firstLoad) {
        divClasses += " is-active";
      } else {
        divClasses += " filled";
      }
    }
    return divClasses;
  }, [value]);

  return (
    <button
      onClick={onClickHandler}
      className="icon-hover relative right-[-10px] flex justify-center items-center w-[3rem] h-[3rem] overflow-visible scale-[.66]"
    >
      <div className={classes}></div>
    </button>
  );
}
