import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useMenuHook = () => {
    const axiosPublic = useAxiosPublic();

    const {data: menu = [], isPending : loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('menu');
            console.log('menuhook', res.data)
            return res.data
        }
})
  return [menu, loading, refetch]
}

export default useMenuHook