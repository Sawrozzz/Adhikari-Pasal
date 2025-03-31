import React, { useEffect, useState } from "react";
import useIndividualOrderStore from "../../store/individualOrderStore";
import {
  ChevronDown,
  ChevronUp,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  ShoppingBag,
  Trash2,
} from "lucide-react";

const Order = () => {
  const { fetchOrders, orders } = useIndividualOrderStore();

  // State to track which orders are expanded
  const [expandedOrders, setExpandedOrders] = useState({});

  // State to track existing orders (for delete functionality)
  const [userOrders, setUserOrders] = useState([]);

  // Toggle order expansion
  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setUserOrders(orders);
  }, [orders]);

  // Delete order handler (prevent event propagation to avoid toggling)
  const handleDeleteOrder = (e, orderId) => {
    e.stopPropagation();
    setUserOrders(userOrders.filter((order) => order.orderId !== orderId));
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status:string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipping":
        return "bg-blue-100 text-blue-800";
      case "paid and processing":
        return "bg-yellow-100 text-yellow-800";
      case "created":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status:string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipping":
        return <Truck className="w-4 h-4" />;
      case "paid and processing":
        return <Package className="w-4 h-4" />;
      case "created":
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

        {userOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to see your orders here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div
                  className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrder(order.orderId)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.orderId}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(order.orderCreatedTime)}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full Rs.${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">
                      Rs.{order.totalPrice}
                    </span>
                    <button
                      onClick={(e) => handleDeleteOrder(e, order.orderId)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete order"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {expandedOrders[order.orderId] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedOrders[order.orderId] && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          {order.location}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-3">
                      Items in this order
                    </h4>
                    <ul className="divide-y divide-gray-200">
                      {order.cartItems.map((item) => (
                        <li key={item.cartId} className="py-4 flex">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="h-20 w-20 rounded-md object-cover object-center"
                          />
                          <div className="ml-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between">
                                <h5 className="text-sm font-medium text-gray-900">
                                  {item.productName}
                                </h5>
                                <p className="text-sm font-medium text-gray-900 ">
                                  <span className="line-through">
                                    {item.discount}%
                                  </span>
                                  <span> discount</span>
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center">
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center">
                              <p className="text-sm text-gray-500">
                                Rs.{item.discountedPrice.toFixed()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">
                        Rs.{order.totalPrice}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
