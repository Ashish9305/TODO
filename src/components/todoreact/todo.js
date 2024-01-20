import React, { useState, useEffect } from 'react'
import "./style.css"

// get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    //here mytodoist is the key 
    if(lists){
        return JSON.parse(lists);
        // JSON.parse will convert this string to an array 
    }
    else {
        return [];
    }
}

const Todo = () => {

    const[inputdata,setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    // add the itemn functions 

    const [isEditItem,setisEditItem] = useState("");
    const [toggleButton , setToggleButton] = useState(false);

    const addItem = () => {
        if(!inputdata) {
            alert("plz fill the data ");
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curEle) => {
                    if(curEle.id === isEditItem){
                        return{ ...curEle, name: inputdata};
                    }
                    return curEle;
                })
            );
            setInputdata([]);
            setisEditItem();
            setToggleButton(false);
        }
        else{
            const myNewInputdata = {
                id: new Date().getTime().toString(),
                name : inputdata,
            };
            setItems([...items, myNewInputdata])
                    // ...item will keep prev data and , inputdata is to add current data also
            setInputdata("");        
        }
    };

    // edit the items 
    const editItem = (index) => {
        const item_todo_edited =items.find((curEle) => {
            return curEle.id === index ;
        });
       setInputdata(item_todo_edited.name);
        setisEditItem(index);
        setToggleButton(true);

    }

    // how to delete item sections
    const deleteItem = (index) => {
        const updatedItems = items.filter((curEle) => {
            return curEle.id !== index;

        });
        setItems(updatedItems)

    }
// remove all the elements 
    const removeAll = () => {
         setItems([]);

    }

    // adding local Storage

    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items))
        // here mytodolist is the key and items are my values and this value should always be in string format only in localstorage this is the only rule 

    },[items]);

  return (
    <>
    <div className="main-div">
        <div className="child-div">

            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add Your List Here</figcaption>
            </figure>

            <div className="addItems">
                <input type="text" 
                placeholder="✍️ Add Items"
                className="form-control"
                value={inputdata }
                onChange={(event) => setInputdata(event.target.value)}
                />
                {toggleButton ? (
                    <i className="far fa-edit add-btn" onClick={addItem}></i>
                ) : (
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>
                )}
                
                
            </div>


            {/* // remove all buttons */}
            <div>
                {/* show our items  */}
                <div className='showItems'>

                    {items.map((curEle) => {
                        return (
                            <div className="eachItem" key={curEle.id}>
                            <h3>{curEle.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit add-btn" onClick={() => editItem(curEle.id) }></i>
                            <i className="far fa-trash-alt add-btn" 
                            onClick={() => deleteItem(curEle.id)}></i>
                            </div>
                        </div>

                        );
                    })}

                   

                </div>
              {/* remove all button  */}
            </div>
             <div className="showItems">
                <button className='btn effect04'
                 data-sm-link-text="Remove All"
                 onClick={removeAll}>
                <span>CHECK LIST</span></button>
             </div>
        </div>

    </div>
    </>
  )
}

export default Todo ;
