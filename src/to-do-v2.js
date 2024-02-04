import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MyList(){
    const[newItem, setNewItem] = useState([]);

//   caturing the new item and add it to the list

const addItem = (newItemText) => {
    setNewItem([...newItem, {text: newItemText, completed: false}]);
    
}

const handleClick = (index) => {
    const updatedItems = [...newItem];
        updatedItems[index].completed = !updatedItems[index].completed;
        setNewItem(updatedItems);

}


// this is an idea how to filter completed items and add it to a list
// const checkedItems = newItem.filter(item => {if(item.completed = true) {return item}});

    return(
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" 
                            label="Enter new item" 
                            variant="outlined"
                            onKeyDown = {
                                (e) => { if (e.key === "Enter" && e.target.value.trim() !== "") {
                                     
                                        e.preventDefault();
                                    addItem(e.target.value);
                                    e.target.value = "";
                                }}
                                
                            } /> 
                            {/* this is to capture the entered new item */}
            </Box>
            <FormGroup>
                {newItem.map((item, index) => (
                    <FormControlLabel 
                    key = {index}
                    control={<Checkbox onClick= {() => handleClick(index)} checked={item.completed}/>} 
                    label= {item.text}
                     />
                     ))}
            </FormGroup>
        </>
    )
}
