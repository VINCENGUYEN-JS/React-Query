import React, { useState, useEffect, useRef, useCallback } from 'react'
import useQuery from './useQuery'

const DEFAUL_OPTION = {
  stop: false,
  firstLoad: false
}

const useInfinityQuery = ({url, depens = [], opt}) => {
  const [page, setPage] = useState(1)

  const option = {...DEFAUL_OPTION, ...opt}

  const btnRef = useRef()

  const query = useQuery(`${url}&page=${page}`)

  useEffect(() => {
    setPage(1)
  }, depens)

  const handleLoadmore = useCallback(() => {
    if(option.stop) return;
    setPage(prev => prev + 1)
  }, [option.stop])

  useEffect(() => {
    const btn = btnRef.current;

    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && option.firstLoad){
        handleLoadmore()
      }
    })

    if(btn) observer.observe(btn)

    return () => {
      if(btn) observer.unobserve(btn)
    }

  }, [handleLoadmore, option.firstLoad])


  const BtnRender = () => {
    return (
      <button className="btn-load_more"
      onClick={handleLoadmore}
      disabled={option.stop} ref={btnRef}
      >
        Load more
      </button>
    )
  }

  return { BtnRender, ...query }
}

export default useInfinityQuery