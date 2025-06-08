import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TableEntry {
    id: string;
    code: string;
    name: string;
    amount: number;
    type: string;
}

const RePortOrderBilling: React.FC = () => {
    const [entries] = useState<TableEntry[]>([
        {
            id: '1',
            code: 'OR1002',
            name: 'KEMEI KEMEI',
            amount: 10,
            type: ''
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('rasada');

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b p-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        ລາຍການຂໍ້ມູນລະອອກບິນ
                    </h1>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Category Filter */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4">
                            <label className="text-sm text-gray-600">
                                ເລືອກເພື່ອໃຫ້ຂໍ້ມູນເຫລົ່ານີ້ໃຫ້ຄະແນງ
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[120px]"
                            >
                                <option value="rasada">rasada</option>
                                <option value="other">other</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gray-700 text-white">
                            <div className="grid grid-cols-4 gap-px">
                                <div className="px-6 py-4 text-sm font-medium">ລະຫັດລາຍການ</div>
                                <div className="px-6 py-4 text-sm font-medium">ຊື່ລາຍການ</div>
                                <div className="px-6 py-4 text-sm font-medium">ຈຳນວນ</div>
                                <div className="px-6 py-4 text-sm font-medium">ໝາຍເຫດ</div>
                            </div>
                        </div>

                        {/* Filter Row */}
                        <div className="bg-blue-50 border-b">
                            <div className="grid grid-cols-4 gap-px">
                                <div className="px-6 py-3">
                                    <span className="text-sm text-blue-600">ຜູ້ສະໜອງ : rasada</span>
                                </div>
                                <div className="px-6 py-3"></div>
                                <div className="px-6 py-3"></div>
                                <div className="px-6 py-3">
                                    <span className="text-sm text-blue-600">ຍັງ : 1 ລາຍການ</span>
                                </div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200">
                            {entries.map((entry) => (
                                <div key={entry.id} className="grid grid-cols-4 gap-px hover:bg-gray-50 transition-colors">
                                    <div className="px-6 py-4 text-sm text-gray-900">{entry.code}</div>
                                    <div className="px-6 py-4 text-sm text-gray-900">{entry.name}</div>
                                    <div className="px-6 py-4 text-sm text-gray-900">{entry.amount}</div>
                                    <div className="px-6 py-4 text-sm text-gray-900">{entry.type}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RePortOrderBilling;