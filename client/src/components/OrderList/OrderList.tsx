import React, { useEffect } from "react";
import useOrderStore from "../../store/orderStore";
import { Trash2Icon } from "lucide-react";
import { orderStatus } from "../../store/orderStore";

const OrderTable = () => {
  const { orders, fetchOrders, updateOrderStatus, deleteOrder } =
    useOrderStore();

  const handleStatusChange = (orderId: string, newStatus: orderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
  };
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-center text-3xl font-semibold mb-2">Order List</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-2 sm:px-6 text-left">
              <input type="checkbox" />
            </th>
            <th className="py-3 px-2 sm:px-6 text-left">Order Id</th>
            <th className="py-3 px-2 sm:px-6 text-left">Order Time</th>
            <th className="py-3 px-2 sm:px-6 text-left">Customer Name</th>
            <th className="py-3 px-2 sm:px-6 text-left">Payment Method</th>
            <th className="py-3 px-2 sm:px-6 text-left">Location</th>
            <th className="py-3 px-2 sm:px-6 text-left">Status</th>
            <th className="py-3 px-2 sm:px-6 text-left">Total Transaction</th>
            <th className="py-3 px-2 sm:px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {orders.map((order, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-2 sm:px-6">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-2 sm:px-6">{order._id}</td>
              <td className="py-3 px-2 sm:px-6">
                {new Date(order.createdAt).toLocaleDateString("en-US")}
              </td>
              <td className="py-3 px-2 sm:px-6">{order.user.fullName}</td>
              <td className="py-3 px-2 sm:px-6">{order.payment_method}</td>
              <td className="py-3 px-2 sm:px-6">{order.address}</td>
              <td className="py-3 px-2 sm:px-6">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className=" cursor-pointer"
                >
                  <option value="created">Created</option>
                  <option value="paid and processing">Paid & Processing</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="py-3 px-2 sm:px-6">
                {order.order_data.totalPrice}
              </td>

              <td className="py-3 px-2 sm:px-6">
                <span>
                  <Trash2Icon
                    width={13}
                    className="hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDeleteOrder(order._id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
