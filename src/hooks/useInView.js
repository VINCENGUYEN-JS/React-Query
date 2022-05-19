import React, { useState, useEffect, useRef } from "react";

const useInView = () => {
  const [inView, setInView] = React.useState(false);
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);
  return { inView, ref };
};

export default useInView;
