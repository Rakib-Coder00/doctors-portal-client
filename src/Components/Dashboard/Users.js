import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner';
import UserRow from './UserRow';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://ancient-savannah-56853.herokuapp.com/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h2 className='text-2xl'>All User : {users.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>SL/no</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <UserRow key={user._id} user={user} index={index} refetch={refetch} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;