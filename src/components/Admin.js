import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch all users
        const fetchUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };

        fetchUsers();
    }, [axiosPrivate]);

    const handleBanUser = async (username) => {
        // Implement the logic to ban the user
        try {
            await axiosPrivate.put(`/users/ban/${username}`);
            // After banning the user, update the state
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if (user.username === username) {
                        return { ...user, disabled: true };
                    }
                    return user;
                });
            });
        } catch (error) {
            console.error('Error banning user:', error);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    return (
        <div>
            <h2 style={{color:'black'}}>Admin Page</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.disabled ? 'Banned' : 'Active'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleBanUser(user.username)}
                                        disabled={user.disabled}
                                    >
                                        Ban
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminPage;
