import React from 'react'
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import ButtonDropdown from '../../components/ButtonDropdown';
import { useNavigate } from 'react-router-dom';
import General from '../../libs/General';


const Navbar = ({ options }) => {
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login")
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h5" sx={{ flex: "1" }}>
                            PageTurner
                        </Typography>
                        <Typography component={"div"} sx={{ display: "flex", flex: "1", justifyContent: "space-evenly" }}>
                            {options.map((option, index) => {
                                return <Button sx={{ color: "white" }} key={"navbar-option-button" + index} variant="text" onClick={() => option.onClickCb(option.path)} >
                                    {option.label}
                                </Button>
                            })}
                        </Typography>
                        <Typography component={"div"} sx={{ flex: "1", justifyContent: "flex-end", display: "flex" }}>
                            <ButtonDropdown buttonLabel={General.getLocalStorage('user').email} options={[{ label: "logout", onClickCb: handleLogoutClick }]} />
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar