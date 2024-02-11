import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MyList(){
    const[newItem, setNewItem] = useState([]);
    const[completedItem, setCompletedItem] = useState([]);

//   caturing the new item and add it to the list

const addItem = (newItemText) => {
    setNewItem([...newItem, {text: newItemText, completed: false}]);
    
}

const handleClick = (index) => {
    const updatedItems = [...newItem];
        updatedItems[index].completed = !updatedItems[index].completed;
        setNewItem(updatedItems);
        
// taking new items and move them to a new state as completed
        if(updatedItems[index].completed) {
            setCompletedItem([...completedItem, updatedItems[index]]);

    // filter out the completed items
           const filteredItems =  updatedItems.filter(item => !item.completed);
           setNewItem(filteredItems)
        }

}




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
            <div className="itemLists">
                <div>
                    <h2>New Items</h2>
                    <FormGroup>
                        {newItem.map((item, index) => (
                            <FormControlLabel 
                            key = {index}
                            control={<Checkbox onClick= {() => handleClick(index)} checked={item.completed}/>} 
                            label= {item.text}
                            />
                            ))}
                    </FormGroup>
                </div>
                    <div>
                        <h2>Completed Items</h2>
                        <ul>
                            {completedItem.map((item,index) => (
                                <li key={index}>{item.text}</li>
                            ))}
                        </ul>
                    </div>
                <div>
                    {/* filter new items and if completed, move it to a new list of completed items */}
                </div>
            </div>
        </>
    )
}
