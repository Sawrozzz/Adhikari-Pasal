import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data] = useState({
    users: 120,
    orders: 80,
    products: 50,
    revenue: 50000,
  });

  const pieData = {
    labels: ["Users", "Orders", "Products"],
    datasets: [
      {
        data: [data.users, data.orders, data.products],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        hoverBackgroundColor: ["#ff4d6a", "#2a91d8", "#ffb733"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom width/height
  };

  return (
    <div className="flex flex-col mt-5 md:flex-row h-screen w-full">
      <main className=" flex  flex-col  items-center w-full p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 w-8/12">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-lg">Total Users</h3>
            <p className="text-2xl font-bold">{data.users}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-lg">Total Orders</h3>
            <p className="text-2xl font-bold">{data.orders}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg">
            <h3 className="text-lg">Total Products</h3>
            <p className="text-2xl font-bold">{data.products}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h3 className="text-lg">Total Revenue</h3>
            <p className="text-2xl font-bold">${data.revenue}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <section className="flex flex-col flex-wrap md:flex-row">
          <div className="bg-white p-5 rounded-lg ">
            <h2 className=" text-center text-xl font-bold mb-3">
              User & Order Distribution
            </h2>
            <div style={{ position: "relative", height: "300px" }}>
              {" "}
              {/* Adjust the height */}
              <Pie data={pieData} options={options} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-bold mb-3">Calendar</h2>
            <Calendar />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
