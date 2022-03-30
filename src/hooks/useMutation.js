import React, { useReducer } from 'react'
import { toast } from 'react-toastify'
import { initialState, reducer } from '../context/reducers/queryReducer'
import { useMyContext } from '../context/store'

const useMutation = () => {
  const [query, dispatch] = useReducer(reducer, initialState)

  const { setRefetching } = useMyContext()

  const mutate = (callback) => {
    dispatch({type: 'LOADING'})

    callback()
      .then(res => {
        dispatch({type: 'SUCCESS', payload: res.data})
        toast.success('Success!')
        setRefetching(prev => !prev)
      })
      .catch(err => {
        dispatch({type: 'ERROR', payload: err.response.data.msg})
        toast.error(err.response.data.msg)
      })
  }

  return { mutate, ...query }
}

export default useMutation