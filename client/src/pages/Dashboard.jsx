import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    dateApplied: '',
    method: 'cold email',
    status: 'applied',
    notes: ''
  })

  useEffect(() => {
    if (user) fetchApplications()
  }, [user])

  const fetchApplications = async () => {
    try {
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setApplications(apps)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateDoc(doc(db, 'applications', editingId), formData)
      } else {
        await addDoc(collection(db, 'applications'), {
          ...formData,
          userId: user.uid,
          createdAt: new Date()
        })
      }
      setShowForm(false)
      setEditingId(null)
      setFormData({ company: '', role: '', dateApplied: '', method: 'cold email', status: 'applied', notes: '' })
      fetchApplications()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (app) => {
    setFormData({
      company: app.company,
      role: app.role,
      dateApplied: app.dateApplied,
      method: app.method,
      status: app.status,
      notes: app.notes || ''
    })
    setEditingId(app.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this application?')) {
      await deleteDoc(doc(db, 'applications', id))
      fetchApplications()
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const total = applications.length
  const replied = applications.filter(a => a.status === 'replied' || a.status === 'interview' || a.status === 'offer').length
  const interviews = applications.filter(a => a.status === 'interview').length
  const rejected = applications.filter(a => a.status === 'rejected').length
  const replyRate = total > 0 ? Math.round((replied / total) * 100) : 0

  const filteredApplications = applications.filter(app => filter === 'all' || app.status === filter)

  const statusColors = {
    applied: 'pill-applied',
    replied: 'pill-replied',
    interview: 'pill-interview',
    offer: 'pill-offer',
    rejected: 'pill-rejected'
  }

  return (
    <div className="dashboard">

      <nav className="dash-nav">
        <div className="nav-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="#6BAED6" strokeWidth="1.5"/>
            <path d="M8 6V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6" stroke="#6BAED6" strokeWidth="1.5"/>
            <path d="M8 12H16" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 15.5H13" stroke="#6BAED6" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="19" cy="17" r="4" fill="#2E86DE"/>
            <path d="M17.5 17L18.5 18L20.5 16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">ApplySmart</span>
        </div>
        <div className="nav-right">
          <span className="nav-name">Hi, {user?.displayName?.split(' ')[0]}</span>
          <button className="btn-insights" onClick={() => navigate('/insights')}>AI Insights</button>
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </div>
      </nav>

      <div className="dash-content">

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-num">{total}</span>
            <span className="stat-lbl">Total applied</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{replyRate}%</span>
            <span className="stat-lbl">Reply rate</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{interviews}</span>
            <span className="stat-lbl">Interviews</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">{rejected}</span>
            <span className="stat-lbl">Rejected</span>
          </div>
        </div>

        <div className="dash-header">
          <h2>Your Applications</h2>
          <button className="btn-add" onClick={() => { setShowForm(true); setEditingId(null); setFormData({ company: '', role: '', dateApplied: '', method: 'cold email', status: 'applied', notes: '' }) }}>
            + Add Application
          </button>
        </div>

        <div className="filter-row">
          {['all', 'applied', 'replied', 'interview', 'offer', 'rejected'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'filter-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="form-card">
            <h3>{editingId ? 'Edit Application' : 'New Application'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Outliant" required />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Frontend Intern" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date Applied</label>
                  <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Method</label>
                  <select name="method" value={formData.method} onChange={handleChange}>
                    <option value="cold email">Cold Email</option>
                    <option value="job board">Job Board</option>
                    <option value="referral">Referral</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="applied">Applied</option>
                    <option value="replied">Replied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Optional notes" />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">{editingId ? 'Save changes' : 'Add application'}</button>
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="empty-msg">Loading...</p>
        ) : filteredApplications.length === 0 ? (
          <p className="empty-msg">{filter === 'all' ? 'No applications yet. Add your first one!' : `No ${filter} applications.`}</p>
        ) : (
          <div className="app-table">
            <div className="table-header">
              <span>Company</span>
              <span>Role</span>
              <span>Date</span>
              <span>Method</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {filteredApplications.map(app => (
              <div className="table-row" key={app.id}>
                <span className="company-name">{app.company}</span>
                <span>{app.role}</span>
                <span>{app.dateApplied}</span>
                <span>{app.method}</span>
                <span><span className={`pill ${statusColors[app.status]}`}>{app.status}</span></span>
                <span className="actions">
                  <button className="btn-edit" onClick={() => handleEdit(app)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(app.id)}>Delete</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard