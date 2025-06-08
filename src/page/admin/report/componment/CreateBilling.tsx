import React, { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface FormData {
    orderCode: string;
    category: string;
    branch: string;
    startDate: string;
    endDate: string;
    amount: string;
    notes: string;
}

const CreateBilling: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        orderCode: '',
        category: '',
        branch: '',
        startDate: '',
        endDate: '',
        amount: '',
        notes: ''
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    const handleEdit = () => {
        console.log('Edit clicked');
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <div className="bg-white shadow-sm mb-6">
                <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-gray-800">56</div>
                        <div className="flex items-center text-gray-600">
                            <BookOpen size={16} className="mr-2" />
                            <span className="text-sm">73 ຈາກ 93</span>
                        </div>
                    </div>
                </div>
                <div className="h-2 bg-black"></div>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        ຟີມຂໍ້ມູນເພື່ອບັນທຶກ
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
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ເລືອກຊື່ຫູ່ສະເໝອງ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">-------ເລືອກຊື່ຫູ່ສະເໝອງ-------</option>
                                    <option value="category1">ໝວດທີ 1</option>
                                    <option value="category2">ໝວດທີ 2</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        {/* Branch Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ເລືອກສີນຄ້າ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.branch}
                                    onChange={(e) => handleInputChange('branch', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">-------ເລືອກສີນຄ້າ-------</option>
                                    <option value="branch1">ສາຂາ 1</option>
                                    <option value="branch2">ສາຂາ 2</option>
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
                                ວັນສຸ່ນທີເລີ່ມ(ວວດດເດືອນທວด)
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
                                type="text"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                placeholder="ກະລຸນາປ້ອນຂໍ້ມູນ"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ໝາຍເຫດ <span className="text-red-500">*</span>
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
                                ເພີ່ມຂໍ້ມູນ
                            </button>
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors border border-yellow-500"
                            >
                                ແກ້ໄຂ
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors border border-green-500"
                            >
                                ໂຫງດຟີນເລີຍ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="mt-6 text-sm text-gray-600 leading-relaxed">
                    <p>
                        ລັບທີ 4.16 ສະແດງຫນ້າຕາມເພີ່ມຂໍ້ມູນການລົງໃບບິນລຳດັບສິ່ງສີ້
                        ນັ້ນມ ການອອກໃບບິນລຳດັບສີ້ເຊີ່ງຄາມຈາດສະແດງຜູ້ສະໜອງ, ຊື່ລາຍ
                        ມາດເພີ່ມໃບບິນລຳດັບສີ້ໄດ້.
                    </p>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">ລາຍການຂໍ້ມູນລະອອກບິນ</h3>
                        <select className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>ເລືອກເພື່ອໃຫ້ຂໍ້ມູນເຫລົ່ານີ້ໃຫ້ຄະແນງ</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBilling;