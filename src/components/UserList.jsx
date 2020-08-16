import React from 'react';


const UserList = (props) =>  {
    
    return (
        <div className="listContainer">
            <div className="lst-div-header">
                <h2>Users Registered</h2>
                <button title="Add User" onClick={() => props.activeAdd()}>Add User <i class="fas fa-plus"></i></button>
            </div>
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.usersLst.length > 0 ? 
            (
                <>
                    {props.usersLst.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button title="Edit" onClick={() => props.activeEdit(user)}><i className="fas fa-edit"></i></button>
                                <button title="Delete" onClick={() => props.deleteUser(user.id)}><i className="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    ))}
                </>
                   
            )
            :
            (
                <tr>
                    <td colSpan={4} >No users registered.</td>
                </tr>
            )
            }

        </tbody>
        </table>
        </div>
    );
}

export default UserList;