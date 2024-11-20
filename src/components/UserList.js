import React, {useState, useEffect} from 'react'
import {getUsers, deleteUser} from '../services/api'
import UserForm from './UserForm'
import Pagination from './Pagination'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = async page => {
    try {
      const response = await getUsers(page, 5)
      setUsers(response.data)
      setTotalUsers(Number(response.headers['x-total-count']))
    } catch (error) {
      alert('Failed to fetch users')
    }
  }

  const handleDelete = async id => {
    try {
      await deleteUser(id)
      fetchUsers(currentPage)
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  return (
    <div>
      <button onClick={() => setEditingUser({})}>Add User</button>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={totalUsers}
        itemsPerPage={5}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {editingUser && (
        <UserForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onRefresh={() => fetchUsers(currentPage)}
        />
      )}
    </div>
  )
}

export default UserList
