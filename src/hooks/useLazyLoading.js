import { useEffect } from "react";

import useInView from "./useInView";

const useLazyLoading = () => {
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      const img = ref.current;
      img.setAttribute("src", img.alt);
      img.classList.add("active");
    }
  }, [ref, inView]);

  return { ref };
};

export default useLazyLoading;
