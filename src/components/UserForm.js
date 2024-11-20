import React, {useState} from 'react'
import {addUser, editUser} from '../services/api'

const UserForm = ({user, onClose, onRefresh}) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  })

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (user.id) {
        await editUser(user.id, formData)
      } else {
        await addUser(formData)
      }
      onRefresh()
      onClose()
    } catch (error) {
      alert('Failed to save user')
    }
  }

  return (
    <div>
      <h2>{user.id ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={formData.name}
          placeholder='Name'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <button type='submit'>Save</button>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UserForm
