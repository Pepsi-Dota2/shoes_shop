import { Table, Button } from "antd";
import { PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IGetAllOrder } from "../../../types/admin/history/history";
import order from "../../../api/order";
import { getHistoryHeader } from "../history/column/column";

const ReportCustomer: React.FC = () => {
    const [getAllOrder, setGetAllOrder] = useState<IGetAllOrder[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fectData = async () => {
        try {
            setIsLoading(true)
            const res = await order.getAllOrder();
            setGetAllOrder(res.data);
            return res;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fectData();
    }, []);

    const handleExportPDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const columns = getHistoryHeader();

        // Generate table HTML with proper styling
        const tableHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Report Customer</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #ddd;
                }
                .header h1 {
                    margin: 0;
                    color: #2c3e50;
                    font-size: 24px;
                }
                .info {
                    margin-bottom: 20px;
                    font-size: 14px;
                    color: #666;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    font-size: 12px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    word-wrap: break-word;
                }
                th {
                    background-color: #f8f9fa;
                    font-weight: bold;
                    color: #2c3e50;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f5f5f5;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
                @page {
                    margin: 1cm;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Order Report</h1>
                <div class="info">
                    Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
                    <br>
                    Total Orders: ${getAllOrder.length}
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        ${columns.map(col => `<th>${col.title || ''}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${getAllOrder.map((item, rowIndex) => `
                        <tr>
                            ${columns.map(col => {
            let value = '';

            // Handle specific column cases based on your column definitions
            if (col.key === 'id') {
                // ID column - show row number
                value = String(rowIndex + 1);
            } else if (col.key === 'payment_image') {
                // Image column - show image path or placeholder
                value = item.payment_image ? 'Payment Image Available' : 'No Image';
            } else if (col.title === 'Customer name') {
                // Customer name from customer object
                value = item.customer?.cus_name || '';
            } else if (col.title === 'phone number') {
                // Phone number from customer object
                value = item.customer?.tel || '';
            } else if (col.title === 'Address') {
                // Address from customer object
                value = item.customer?.address || '';
            } else if ('dataIndex' in col && col.dataIndex) {
                // Handle regular dataIndex columns
                const dataIndex = col.dataIndex as keyof IGetAllOrder;
                const cellValue = item[dataIndex];

                if (cellValue === null || cellValue === undefined) {
                    value = '';
                } else if (typeof cellValue === 'object') {
                    // Type-safe property access for objects
                    if ('cus_name' in cellValue && cellValue.cus_name) {
                        value = String(cellValue.cus_name);
                    } else if ('tel' in cellValue && cellValue.tel) {
                        value = String(cellValue.tel);
                    } else if ('address' in cellValue && cellValue.address) {
                        value = String(cellValue.address);
                    } else if ('number' in cellValue && cellValue.number) {
                        value = String(cellValue.number);
                    } else {
                        value = String(cellValue);
                    }
                } else {
                    value = String(cellValue);
                }
            } else if ('render' in col && col.render && typeof col.render === 'function') {
                // Handle custom render functions as fallback
                try {
                    const dataIndex = ('dataIndex' in col ? col.dataIndex : '') as keyof IGetAllOrder;
                    const cellValue = dataIndex ? item[dataIndex] : '';
                    const rendered = col.render(cellValue, item, rowIndex);

                    if (typeof rendered === 'string') {
                        value = rendered;
                    } else if (typeof rendered === 'number') {
                        value = String(rendered);
                    } else {
                        // For React elements or complex objects, extract the data
                        if (cellValue && typeof cellValue === 'object') {
                            if ('cus_name' in cellValue && cellValue.cus_name) {
                                value = String(cellValue.cus_name);
                            } else if ('tel' in cellValue && cellValue.tel) {
                                value = String(cellValue.tel);
                            } else if ('address' in cellValue && cellValue.address) {
                                value = String(cellValue.address);
                            } else {
                                value = String(cellValue);
                            }
                        } else {
                            value = String(cellValue || '');
                        }
                    }
                } catch (e) {
                    value = '';
                }
            }

            // Clean up the value
            value = String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Limit length for better formatting (except for ID column)
            if (col.key !== 'id' && value.length > 50) {
                value = value.substring(0, 47) + '...';
            }

            return `<td>${value}</td>`;
        }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="footer">
                <p>This report was generated automatically from the Order Management System</p>
            </div>
        </body>
    </html>
`;

        printWindow.document.write(tableHTML);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    // Simple Print Function (browser print dialog)
    const handlePrint = () => {
        window.print();
    };

    const columns = getHistoryHeader();

    return (
        <div>
            <Table
                loading={isLoading}
                className="bg-white rounded-lg"
                title={() => {
                    return (
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-xl">Report Customer</div>
                            <div className="flex gap-2">
                                <Button
                                    type="default"
                                    icon={<PrinterOutlined />}
                                    onClick={handlePrint}
                                    size="large"
                                >
                                    Print
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<FilePdfOutlined />}
                                    onClick={handleExportPDF}
                                    size="large"
                                >
                                    Export PDF
                                </Button>
                            </div>
                        </div>
                    );
                }}
                columns={columns}
                dataSource={getAllOrder}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}

export default ReportCustomer;