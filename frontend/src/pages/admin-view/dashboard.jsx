import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import axios from "axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/analytics`);
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='px-4 mx-0 max-w-7xl sm:px-6 lg:px-8'>
			<div className="text-black text-3xl font-bold mb-7 mt-0">
				<span>
					Dashboard
				</span>
			</div>
			<div className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3'>

				{/* <AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-blue-500 to-teal-700'
				/> */}
				<AnalyticsCard
					title='Total Produk'
					value={analyticsData.products.toLocaleString("id-ID")}
					icon={Package}
					color='from-blue-500 to-green-700'
				/>
				<AnalyticsCard
					title='Total Penjualan'
					value={analyticsData.totalSales.toLocaleString("id-ID")}
					icon={ShoppingCart}
					color='from-blue-500 to-cyan-700'
				/>
				<AnalyticsCard
					title='Total Pendapatan'
					value={`Rp ${analyticsData.totalRevenue.toLocaleString("id-ID")}`}
					icon={DollarSign}
					color='from-blue-500 to-lime-700'
				/>
			</div>
			<div
				className='p-6 rounded-lg shadow-lg border border-gray-200 bg-white grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-2'
			>
				<ResponsiveContainer width='100%' height={400} className={"mt-5"}>
					<LineChart data={dailySalesData}>
					<CartesianGrid strokeDasharray='1 0' stroke='#b5b5b5' />
						<XAxis dataKey='name' stroke='black' />
						<YAxis yAxisId='left' stroke='black' />
						<YAxis yAxisId='right' orientation='right' stroke='black' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Penjualan'
						/>
						{/* <Line
							yAxisId='left'
							type='monotone'
							dataKey='revenue'
							// stroke='#3B82F6'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Revenue'
						/> */}
					</LineChart>
				</ResponsiveContainer>
				<ResponsiveContainer width='100%' height={400} className={"mt-5"}>
					<LineChart data={dailySalesData}>
					<CartesianGrid strokeDasharray='1 0' stroke='#b5b5b5' />
						<XAxis dataKey='name' stroke='black' />
						<YAxis yAxisId='left' stroke='black' />
						<YAxis yAxisId='right' orientation='right' stroke='black' />
						<Tooltip />
						<Legend />
						{/* <Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Sales'
						/> */}
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='revenue'
							// stroke='#3B82F6'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Pendapatan'
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
	>
		<div className='flex items-center justify-between'>
			<div className='z-10'>
				<p className='mb-1 text-sm font-semibold text-blue-300'>{title}</p>
				<h3 className='text-3xl font-bold text-white'>{value}</h3>
			</div>
		</div>
		<div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-30' />
		<div className='absolute text-blue-800 opacity-50 -bottom-4 -right-4'>
			<Icon className='w-32 h-32' />
		</div>
	</div>
);
function AdminDashboard() {
	console.log(import.meta.env.VITE_API_BASE_URL, "base url");
  return (
    <div>

      <AnalyticsTab />
    </div>
  );
}

export default AdminDashboard;