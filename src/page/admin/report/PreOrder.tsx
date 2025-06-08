import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, ChevronDown, BookOpen } from 'lucide-react';

interface TableEntry {
    id: string;
    code: string;
    name: string;
    amount: number;
    type: string;
    status: string;
}

interface FormData {
    orderCode: string;
    category: string;
    branch: string;
    startDate: string;
    endDate: string;
    amount: string;
    notes: string;
}

const CombinedLaoApp: React.FC = () => {
    // Load data from localStorage on initial render
    const [entries, setEntries] = useState<TableEntry[]>(() => {
        const savedEntries = localStorage.getItem('purchaseOrders');
        return savedEntries ? JSON.parse(savedEntries) : [];
    });

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentView, setCurrentView] = useState<'table' | 'form'>('table');
    const [selectedEntry, setSelectedEntry] = useState<TableEntry | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        orderCode: '',
        category: '',
        branch: '',
        startDate: '',
        endDate: '',
        amount: '',
        notes: ''
    });

    // Save to localStorage whenever entries change
    useEffect(() => {
        localStorage.setItem('purchaseOrders', JSON.stringify(entries));
    }, [entries]);

    const resetForm = () => {
        setFormData({
            orderCode: '',
            category: '',
            branch: '',
            startDate: '',
            endDate: '',
            amount: '',
            notes: ''
        });
        setSelectedEntry(null);
        setIsEditing(false);
    };

    const handleAddNew = () => {
        resetForm();
        setCurrentView('form');
    };

    const handleDeleteEntry = (id: string) => {
        if (window.confirm('ທ່ານແນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້?')) {
            setEntries(entries.filter(entry => entry.id !== id));
        }
    };

    const handleViewEntry = (entry: TableEntry) => {
        setSelectedEntry(entry);
        setIsEditing(true);
        setFormData({
            orderCode: entry.code,
            category: entry.type || '',
            branch: entry.name,
            startDate: '',
            endDate: '',
            amount: entry.amount.toString(),
            notes: entry.type || ''
        });
        setCurrentView('form');
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.orderCode || !formData.branch || !formData.amount) {
            alert('ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຈໍາເປັນ');
            return;
        }

        if (isEditing && selectedEntry) {
            // Update existing entry
            setEntries(entries.map(entry =>
                entry.id === selectedEntry.id ? {
                    ...entry,
                    code: formData.orderCode,
                    name: formData.branch,
                    amount: parseInt(formData.amount) || 0,
                    type: formData.notes
                } : entry
            ));
            alert('ແກ້ໄຂຂໍ້ມູນສໍາເລັດແລ້ວ!');
        } else {
            // Add new entry
            const newEntry: TableEntry = {
                id: Date.now().toString(),
                code: formData.orderCode,
                name: formData.branch,
                amount: parseInt(formData.amount) || 0,
                type: formData.notes,
                status: ''
            };
            setEntries([...entries, newEntry]);
            alert('ບັນທຶກຂໍ້ມູນສໍາເລັດແລ້ວ!');
        }

        setCurrentView('table');
        resetForm();
    };

    const handleCancel = () => {
        setCurrentView('table');
        resetForm();
    };

    const filteredEntries = entries.filter(entry =>
        entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderTableView = () => (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            ລາຍການຂໍ້ມູນການສັ່ງຊື້
                        </h1>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddNew}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <span>ເພີ່ມຂໍ້ມູນ</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Controls */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Show</span>
                                <select
                                    value={entriesPerPage}
                                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm text-gray-600">entries</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Search:</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
                                        ລະຫັດການສັ່ງຊື້
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
                                        ຊື່ສິນຄ້າການສັ່ງຊື້
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
                                        ຈຳນວນ
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
                                        ໝາຍເຫດ
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">
                                        ຈັດການ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEntries.length > 0 ? (
                                    filteredEntries.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {entry.code}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {entry.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {entry.amount}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {entry.type || 'ບໍ່ມີ'}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleViewEntry(entry)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteEntry(entry.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            ບໍ່ມີຂໍ້ມູນ
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Showing 1 to {filteredEntries.length} of {filteredEntries.length} entries
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFormView = () => (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <div className="bg-white shadow-sm mb-6">
                <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-gray-800">
                            {isEditing ? `ແກ້ໄຂຂໍ້ມູນ: ${formData.orderCode}` : 'ເພີ່ມຂໍ້ມູນໃໝ່'}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleCancel}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                ← ກັບຄືນລາຍການ
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-2 bg-black"></div>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        {isEditing ? 'ແກ້ໄຂຂໍ້ມູນ' : 'ຟີມຂໍ້ມູນເພື່ອບັນທຶກ'}
                    </h2>

                    <div className="space-y-6">
                        {/* Order Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ລະຫັດການສັ່ງຊື້ <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.orderCode}
                                onChange={(e) => handleInputChange('orderCode', e.target.value)}
                                placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ເລືອກຜູ້ສະໜອງ
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">ເລືອກຊື່ຜູ້ສະໜອງ</option>
                                    <option value="category1">ໝວດທີ 1</option>
                                    <option value="category2">ໝວດທີ 2</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ເລືອກຊື່ສີນຄ້າ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.branch}
                                    onChange={(e) => handleInputChange('branch', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    required
                                >
                                    <option value="">-------ເລືອກຊື່ສີນຄ້າ-------</option>
                                    <option value="branch1">Nike</option>
                                    <option value="branch2">Adidas</option>
                                    <option value="branch2">puma</option>
                                    <option value="branch2">convert</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ວັນປະເຫັດທີເລີ່ມ(ວວດດເດືອນທວດ)
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ວັນສຸ່ນທີເລີ່ມ(ວວດດເດືອນທວດ)
                            </label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ຈຳນວນ <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                min="0"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ໝາຍເຫດ
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 pt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors border border-blue-500"
                            >
                                {isEditing ? 'ອັບເດດ' : 'ບັນທຶກ'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors border border-gray-500"
                            >
                                ຍົກເລີກ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {currentView === 'table' ? renderTableView() : renderFormView()}
        </div>
    );
};

export default CombinedLaoApp;