import React, {useState,useEffect,useRef} from 'react';
import './App.css';
// import './css/main.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Growl} from 'primereact/growl';
import {Dialog} from 'primereact/dialog';


function App() {

  const serverBaseURL = 'http://localhost:8080';
  let growl = useRef(null);

  // Initial state user
  const userInit = {
    id: null,
    name : '',
    email : ''
  };


  const [usersLst, setUsersLst] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(userInit);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccesful, setIsSuccesful] = useState(false);


  const showGrowl = (severity, summary, msgdetail) => {
    growl.current.show({severity: severity, summary: summary, detail: msgdetail});
  }


  //Getting users data from api
  useEffect(() => {
    setIsLoading(true);
    const usersListUrl = serverBaseURL + '/listUser';

    fetch(usersListUrl)
    .then(res => res.json())
    // .then((result) => console.log(result))
    .then(
      (result) => {
        setUsersLst(result);        
      }
      ,
      (error) => {
        showGrowl('error','Error Message',error.toString())
        setUsersLst([]);        
      }
    )

    setIsLoading(false);
  }, [isSuccesful]);//Monitoring is succesful to update list
  

  //Insert User
  const addUser = user => { 
    setIsLoading(true);
    setIsSuccesful(false)

    const insertUserUrl = serverBaseURL + '/insertUser';
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json; charset=UTF-8');
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: requestHeaders
    };

    fetch(insertUserUrl, options)
      .then(res => res.json())
      .then(result => {
        setIsSuccesful(true)
        showGrowl('success','Success Message','User Inserted')
      },
      (error) => {
        setIsSuccesful(false)
        showGrowl('error','Error Message',error.toString())
      }
    )

    setIsAdding(false);
    setIsLoading(false);

  }

  //delete user
  const deleteUser = idUser => { 

    setIsLoading(true);
    setIsSuccesful(false)

    const deleteUserUrl = serverBaseURL + '/deleteUser/' + idUser;
    const options = {
      method: 'DELETE'    
    };

    fetch(deleteUserUrl, options)
      .then(res => res.json())
      .then(result => {
        setIsSuccesful(true)
        showGrowl('info','Success Message','User Deleted')
      },
      (error) => {
        setIsSuccesful(false)
        showGrowl('error','Error Message',error.toString())
      }
    )

    setIsLoading(false); 
  }

  //Update user
  const updateUser = (newUser) => { 

    setIsLoading(true);
    setIsSuccesful(false)

    const updateUserUrl = serverBaseURL + '/updateUser';
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json; charset=UTF-8');
    const options = {
      method: 'PUT',
      body: JSON.stringify(newUser),
      headers: requestHeaders
    };

    fetch(updateUserUrl, options)
      .then(res => res.json())
      .then(result => {
        setIsSuccesful(true)
        showGrowl('success','Success Message','User Updated')
      },
      (error) => {
        setIsSuccesful(false)
        showGrowl('error','Error Message',error.toString())
      }
    )

    setIsLoading(false);
  }

   //To know if we are editing (click from list)
   const activeAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
  }

  //To know if we are editing (click from list)
  const activeEdit = (user) => {
    setIsAdding(false);
    setIsEditing(true);
    setCurrentUser(user);
  }
  //To know if we cancel the edition or addition (click from update form)
  const cancelAction = () => {
    setIsEditing(false);
    setIsAdding(false);
  }



  return (
    <div className="App">
      <Header/>  
      <Growl ref={growl} />
      <div className="mainContainer">               
        { (isEditing &&    
          <Dialog header="Edit User" className="dialog-form" visible={isEditing} closable={false}>
           <EditUserForm currentUser={currentUser} cancelAction={cancelAction} updateUser={updateUser}/>
          </Dialog>      
          )
        }
        {
          (isAdding &&
          <Dialog header="New User" className="dialog-form" visible={isAdding} closable={false}>
            <AddUserForm addUser={addUser} cancelAction={cancelAction} />
          </Dialog>)
        }
          
        { isLoading === false ?//blocker
            <UserList usersLst={usersLst} deleteUser={deleteUser} activeEdit={activeEdit} activeAdd={activeAdd} />
          :
            <ProgressSpinner/>
        } 
      </div> 
      <Footer/>
    </div>
  );
}

export default App;
