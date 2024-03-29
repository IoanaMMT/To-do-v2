import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

const clearList = () => {
    setCompletedItem([]);
}

    return(
        <>
            <div className="hero">
            <div className="container">
                <div className="textField">
                <h1 className="title">Daily Tasks</h1>
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
                </div>
                <div className="itemLists">
                    <div className="newItemList">
                            <h2>To Do List</h2>
                            <FormGroup className="ulNewItemList">
                                        {newItem.map((item, index) => (
                                            <FormControlLabel 
                                            key = {index}
                                            control={<Checkbox onClick= {() => handleClick(index)} checked={item.completed}/>} 
                                            label= {item.text}
                                        />                                  
                                        ))}
                                    </FormGroup>

                        {/* filter new items and if completed, move it to a new list of completed items */}
                </div>
                    <div className="completedItemList">
                            <h2 className="doneList">Done</h2>
                                <ul className="ulCompletedItemList">
                                    {completedItem.map((item,index) => (
                                        <li key={index}>{item.text}</li>
                                    ))}
                                </ul>
                                <Button variant="outlined" className="clear-button"style={{ borderRadius: '10px' }} onClick = {clearList}>Clear</Button>
                    </div>
                </div>

           </div>
            </div>
        </>
    )
}
