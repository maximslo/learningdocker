"use client";
import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";

interface UserInterfaceProps {
  backendName: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function UserInterface({ backendName }: UserInterfaceProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
        console.log(response);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendName, apiUrl]);

  // Create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
        setUsers([response.data, ...users])
        setNewUser({name: '', email: ''})
    } catch (error) {
        console.error('Error creating user:', error)
    }
  }

  return (
    <div>
      <h1>{backendName}</h1>

      <form onSubmit={createUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
        <input
            placeholder="Name"
            value = {newUser.name}
            onChange = {(e) => setNewUser({...newUser, name: e.target.value})}
            className = 'mb-2 w-full p-2 border border-gray-300 rounded bg-white'
        />
        <input
            placeholder="Email"
            value = {newUser.email}
            onChange = {(e) => setNewUser({...newUser, email: e.target.value})}
            className = 'mb-2 w-full p-2 border border-gray-300 rounded bg-white'
        />
        <button type="submit" className='w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
            Add User
        </button>
      </form>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <CardComponent card={user} />
            {/* <button onClick={() => deleteUser(user.id)}>Delete User</button> */}
          </div>
        ))}
      </div>
      {/* <CardComponent card={{ id: 1, name: "John Doe", email: "email" }} /> */}
    </div>
  );
}
