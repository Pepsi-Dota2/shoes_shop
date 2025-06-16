import React, { useState } from 'react';
import { Search } from 'lucide-react';

const OrderHistory = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const orders = [
        {
            id: '#1',
            brand: 'Nike',
            icon: '👟',
            address: 'Meadow Lane Oakland',
            date: 'Just now',
            status: 'In Progress',
            statusColor: 'bg-purple-100 text-purple-700'
        },
        {
            id: '#2',
            brand: 'Adidas',
            icon: '👟',
            address: 'Larry San Francisco',
            date: 'A minute ago',
            status: 'Complete',
            statusColor: 'bg-green-100 text-green-700'
        },
        {
            id: '#3',
            brand: 'Puma',
            icon: '👟',
            address: 'Bagwell Avenue Ocala',
            date: '1 hour ago',
            status: 'Pending',
            statusColor: 'bg-blue-100 text-blue-700'
        }
    ];

    const filteredOrders = orders.filter(order =>
        order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">History Order</h1>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder=""
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-2">Order ID</div>
                            <div className="col-span-3">ลูกค้าชื่อ</div>
                            <div className="col-span-3">Address</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Status</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {filteredOrders.map((order, index) => (
                            <div key={index} className="px-6 py-6 hover:bg-gray-50 transition-colors duration-150">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    {/* Order ID */}
                                    <div className="col-span-2">
                                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                                    </div>

                                    {/* Brand with Icon */}
                                    <div className="col-span-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                                                {order.icon}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{order.brand}</span>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="col-span-3">
                                        <span className="text-sm text-gray-600">{order.address}</span>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-2">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{order.date}</span>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* No Results */}
                {filteredOrders.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No orders found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;