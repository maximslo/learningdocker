'use client'
import { useEffect, useState } from "react"
import CardComponent from "./CardComponent"
import axios from "axios"

interface UserInterfaceProps {
    backendName: string
}

interface User {
    id: number;
    name: string;
    email: string;
  }

export default function UserInterface({ backendName }: UserInterfaceProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000'
    const [users, setUsers] = useState<User[]>([])
    const [newUser, setNewUser] = useState({ name: '', email: '' })
    const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' })

    // Fetch users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
                setUsers(response.data.reverse())
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData();
    }, [backendName, apiUrl])

    return <div>
        <h1>{backendName}</h1>
        <CardComponent card={{ id: 1, name: "John Doe", email: "email" }} />
    </div>
}
