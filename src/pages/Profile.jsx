import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement profile update API
    setTimeout(() => {
      toast.success('Profile updated successfully!')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="max-w-2xl">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {user?.role && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="font-semibold capitalize">{user.role.toLowerCase().replace('role_', '')}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
