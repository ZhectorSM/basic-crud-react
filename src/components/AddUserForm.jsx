import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';


const AddUserForm = (props) =>  {

    // Initial state
    const userInit = {
        id: null,
        name : '',
        email : '',
        pwd: ''
    };

    // Setter hook
    const [user, setUser] = useState(userInit);


    //generic input handler
    const inputChangeHandler = (event) => {
        const { name, value } = event.target    //Destructuring event
        setUser({ ...user, [name]: value }) //Addiing new prop
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log("add -> " + user.name + ' ' + user.email );       
        props.addUser(user);//Adding user
        setUser(userInit);//Reset user obj

    }

   
    return (
        <div className="formContainer">
        <form onSubmit={submitHandler}>
            <label>Name</label>
            <span className="p-float-label">
                <InputText id="float-input-name" name="name" type="text" value={user.name} onChange={inputChangeHandler} required/>
                <label htmlFor="float-input-name">Username</label>
            </span>  
            <label>Email</label>
            <span className="p-float-label">
                <InputText id="float-input-email" name="email" type="text" value={user.email} onChange={inputChangeHandler} required/>
                <label htmlFor="float-input-email">Email</label>
            </span> 
            <label>Password</label>
            <span className="p-float-label">
                <Password  id="float-input-pwd" name="pwd" type="password" value={user.pwd} onChange={inputChangeHandler} required/>
                <label htmlFor="float-input-pwd">Password</label>
            </span>
            <button type="submit" title="Add"><i className="fas fa-user-plus"></i></button>
            <button type="button" title="Cancel" onClick={() => props.cancelAction()}><i class="fas fa-times"></i></button>
        </form>
        </div>
    );
}

export default AddUserForm;