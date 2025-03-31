import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import useAuthStore from "../../store/authStore";
import useProductStore from "../../store/productStore";
import useOrderStore from "../../store/orderStore";

import OrderList from "../../components/OrderList/OrderList";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

  const { allUsersCount, fetchUsers } = useAuthStore();
  const { productLength, fetchAllProducts } = useProductStore();
  const { orderCount, totalSumOfTotalPrices } = useOrderStore();

  useEffect(() => {
    fetchUsers();
    fetchAllProducts();
  }, [fetchUsers, fetchAllProducts]);

  return (
    <>
      <div className="flex flex-col mt-5 md:flex-row h-screen w-full">
        <main className="flex flex-col items-center w-full p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 w-full md:w-8/12">
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <h3 className="text-lg">Total Users</h3>
              <p className="text-2xl font-bold">{allUsersCount}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <h3 className="text-lg">Total Orders</h3>
              <p className="text-2xl font-bold">{orderCount}</p>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg">
              <h3 className="text-lg">Total Products</h3>
              <p className="text-2xl font-bold">{productLength}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg">
              <h3 className="text-lg">Total Revenue</h3>
              <p className="text-2xl font-bold">Rs.{totalSumOfTotalPrices}</p>
            </div>
          </div>
          <div className="w-full md:w-10/12">
            <OrderList />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
