import { useEffect, useMemo, useState } from "react";
import "./AnimatedLike.scss";

export default function AnimatedLike({ value }: { value: boolean }) {
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

  return <div className={classes}></div>;
}
