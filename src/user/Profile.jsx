import React from 'react'
import { useGetUserQuery } from '../store/api/UserSlice'

function Profile() {
    const { data: user = {}, error, isLoading } = useGetUserQuery();
    return (
        <div className='min-h-screen flex flex-row items-center justify-center bg-gray-200'>
            <div className='mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2'>
                <h1 className='mb-10 text-2xl front-bold'>Profile</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    )
}

export default Profile