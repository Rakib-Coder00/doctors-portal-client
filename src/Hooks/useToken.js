import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        console.log('user logged in', user);
        const email = user?.user?.email;
        const currentUser = { email: email };
        if (email) {
            fetch(`https://ancient-savannah-56853.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('inside Data', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }
    }, [user])


    return [token, setToken];
};

export default useToken;