import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ArrowUpRight, Users, Package, DollarSign, ShoppingCart } from 'lucide-react'

const salesData = [
   { name: 'Jan', sales: 4000 },
   { name: 'Feb', sales: 3000 },
   { name: 'Mar', sales: 5000 },
   { name: 'Apr', sales: 4500 },
   { name: 'May', sales: 6000 },
   { name: 'Jun', sales: 5500 },
   { name: 'Jul', sales: 5500 },
   { name: 'Aug', sales: 5500 },
   { name: 'Sep', sales: 5500 },
   { name: 'Oct', sales: 5500 },
   { name: 'Nov', sales: 5500 },
   { name: 'Dec', sales: 5500 },
]
const thisMonth = [
   { name: '01/1/2025', sales: 4000 },
   { name: '02/1/2025', sales: 3000 },
   { name: '03/1/2025', sales: 5000 },
   { name: '04/1/2025', sales: 4500 },
   { name: '05/1/2025', sales: 6000 },

]


const revenueData = [
   { name: 'Jan', revenue: 699 },
   { name: 'Feb', revenue: 15000 },
   { name: 'Mar', revenue: 18000 },
   { name: 'Apr', revenue: 12000 },
   { name: 'May', revenue: 25000 },
   { name: 'Jun', revenue: 30000 },
   { name: 'Jul', revenue: 30000 },
   { name: 'Aug', revenue: 50000 },
   { name: 'Sep', revenue: 90000 },
   { name: 'Oct', revenue: 30000 },
   { name: 'Nov', revenue: 10000 },
   { name: 'Dec', revenue: 30000 },
]

const Overview = () => {
   return (
      <div className=" px-2  ">


         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:col-span-2 gap-6 mb-6">
               <StatCard
                  title="Total Customers"
                  value="5,423"
                  iconBg="bg-blue-50"

                  icon={<Users className="h-8 w-8 text-blue-500" />}
               />
               <StatCard
                  title="Total Products"
                  value="1,234"
                  iconBg="bg-green-50"
                  icon={<Package className="h-8 w-8 text-green-500" />}
               />
               <StatCard
                  title="Total Revenue"
                  value="$253,890"
                  increase="23%"
                  iconBg="bg-orange-50"
                  icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
               />
               <StatCard
                  title="Total Orders"
                  value="7,890"
                  increase="18%"
                  iconBg="bg-purple-50"
                  icon={<ShoppingCart className="h-8 w-8 text-purple-500" />}
               />
            </div>
            <Card>
               <CardHeader>
                  <CardTitle>This month  sales</CardTitle>
               </CardHeader>
               <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                     <BarChart data={thisMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#1900ff" />
                     </BarChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>
         </div>


         <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
            <Card>
               <CardHeader>
                  <CardTitle>Monthly Sales</CardTitle>
               </CardHeader>
               <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                     <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#3b82f6" />
                     </BarChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
               </CardHeader>
               <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                     <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                     </LineChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

const StatCard = ({ title, value, increase, icon, iconBg }) => (
   <Card>
      <CardContent className="flex items-center justify-between p-6">
         <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-sm font-medium text-green-500 flex items-center mt-1">
               {increase && <ArrowUpRight className="h-4 w-4 mr-1" />}
               {increase}
            </p>
         </div>
         <div className={`${iconBg} p-3 rounded-full`}>
            {icon}
         </div>
      </CardContent>
   </Card>
)

export default Overview

