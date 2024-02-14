import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import useFetch from '../../libs/customhooks/UseFetch';
import General from '../../libs/General';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [errors, setErrors] = useState("")


    const fetch = useFetch()

    const handleLogin = async () => {
        const response = await fetch({ url: "/login", type: 'POST', data: { email, password } })
        const { loading, data, error } = response

        if (data.accessToken) {
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
                        Login
                    </Typography>
                    <TextField
                        label="email"
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
                        onClick={handleLogin}
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    <Typography color={"darkorange"}>{errors}</Typography>
                </CardContent>
                <Button
                    variant="text"
                    fullWidth
                    onClick={() => navigate("/signup")}
                >
                    Signup
                </Button>
            </Card>
        </Typography>
    );
}

export default Login;
