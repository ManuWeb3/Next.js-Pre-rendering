import { useState, useEffect } from 'react';

function Dashboard () {
    const [isLoading, setIsLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        async function fetchDashboardData() {
            const response =await fetch('http://localhost:4000/dashboard')
            const data = await response.json()
            
            setDashboardData(data)
            setIsLoading(false)
        }
        fetchDashboardData()
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div>
                <h1>Dashboard:</h1>
                <h3>Posts: {dashboardData.posts}</h3>
                <h3>Likes: {dashboardData.likes}</h3>
                <h3>Followers: {dashboardData.followers}</h3>
                <h3>Following: {dashboardData.following}</h3>
            </div>
        </>
    )
}

export default Dashboard

/*
import { useState, useEffect } from 'react'

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch('http://localhost:4000/dashboard')
      const data = await response.json()
      
      setDashboardData(data)
      console.log("Dashboard data set");
      setIsLoading(false)
      console.log("isLoading inverted");
    }
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Posts - {dashboardData.posts}</h2>
      <h2>Likes - {dashboardData.likes}</h2>
      <h2>Followers - {dashboardData.followers}</h2>
      <h2>Following - {dashboardData.following}</h2>
    </div>
  )
}

export default Dashboard
*/