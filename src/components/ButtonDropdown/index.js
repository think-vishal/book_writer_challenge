import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

function ButtonDropdown({ buttonLabel = "", options = [] }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="text"
                sx={{ color: "white" }}
            >
                {buttonLabel}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options?.length ? options.map((option, index) => {
                    return <MenuItem key={"button-dropdown-option" + index} onClick={option.onClickCb}>
                        {option.label}
                    </MenuItem>
                }) : null}
            </Menu>
        </div>
    );
}

export default ButtonDropdown;
