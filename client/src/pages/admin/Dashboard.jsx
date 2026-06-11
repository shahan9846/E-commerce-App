import React, { useEffect, useState } from 'react'
import { getAdminStats } from '../../services/admin-api-service/customerApi'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0
    })

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getAdminStats()
                if (data) {
                    setStats(data)
                }
            } catch (error) {
                console.error("Failed to load dashboard stats:", error)
            }
        }
        loadStats()
    }, [])

    return (
        <>
            <div className="dashboard-main_section">
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Total Users</h3>
                        <h3>{stats.totalUsers}</h3>
                    </div>
                    <div className="dashboard-card">
                        <h3>Total Orders</h3>
                        <h3>{stats.totalOrders}</h3>
                    </div>
                    <div className="dashboard-card">
                        <h3>Total Products</h3>
                        <h3>{stats.totalProducts}</h3>
                    </div>
                </div>
                <div className="dashboard-weekly_charts_best_selling_product">
                    <div className="dashboard-weekly_charts">
                        <h2>Weekly Sales</h2>
                    </div>
                    <div className="dashboard-best_selling_product">
                        <h2>Best Selling Products</h2>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

