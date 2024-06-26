import React from 'react'
import { useQueryUser } from '../hooks/useQueryUser'
import { Loader } from '@mantine/core';

export const UserInfo= () => {
    const {data: user, status} = useQueryUser();
    if(status === 'loading') return <Loader />
    return (
       <div>{user?.email}</div>
    );
}
