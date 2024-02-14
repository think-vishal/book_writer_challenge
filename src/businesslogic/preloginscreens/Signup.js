import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import General from '../../libs/General';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../libs/customhooks/UseFetch';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const fetch = useFetch()
    const [errors, setErrors] = useState("")


    const handleSignup = async () => {
        const response = await fetch({ url: "/signup", type: 'POST', data: { name, email, password, userType: "2", editPermission: true } })
        const { loading, data, error } = response

        if (data?.accessToken) {
            General.setLocalStorage("token", data.accessToken)
            General.setLocalStorage("user", data.user)
            navigate("/")
        } else {
            setErrors(error)
        }

    };

    return (
        <Typography component={"div"} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: "100vw", height: "100vh" }}>
            <Card sx={{ maxWidth: 400, margin: 'auto' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Signup
                    </Typography>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSignup}
                        sx={{ mt: 2 }}
                    >
                        Signup
                    </Button>
                    <Typography color={"darkorange"}>{errors}</Typography>
                </CardContent>
                <Button
                    variant="text"
                    fullWidth
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </Card>
        </Typography>
    );
}

export default Signup;
