import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                console.log('res', res.data);
                return res.data?.admin;
            } catch (error) {
                console.error('Error fetching isAdmin:', error);
                return false; // or handle error as needed
            }
        },
    });

    return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
