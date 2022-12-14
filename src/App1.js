import { useEffect, useState } from 'react';
import { db } from './lib/init-firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import './App.css';

function App1() {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {
        users.map((user) => {
          return (
            <>
              <div>
                <h1>Name: {user.name}</h1>
                <h2>Age: {user.age}</h2>
                <button
                  onClick={() => updateUser(user.id, user.age)}
                >
                  Increase Age
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
              <hr />
            </>
          )
        })
      }
    </div>
  );
}

export default App1;
