import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function SuggestionList({users, channelMembers, setChannelMembers}) {

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const setMembers = (selectedUses) => {
        const members = selectedUses.map(user => {
            return user._id
        })

        setChannelMembers(members)
    }

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setMembers(value);
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel>Users</InputLabel>
                <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Users"/>}
                >
                    {users.map((user) => (
                        <MenuItem
                            key={user._id}
                            value={user}
                            style={getStyles(user.username, personName, theme)}
                        >
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
