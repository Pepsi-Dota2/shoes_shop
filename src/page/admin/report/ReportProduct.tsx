import React, { useEffect, useState, useRef } from "react";
import { IProductItem } from "../../../types/admin/product/product";
import { Input, Table, Button } from "antd";
import { PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import product from "../../../api/product";
import { getAllProductHeader } from "./column/header";

const ReportProduct: React.FC = () => {
    const [getAllProduct, setGetAllProduct] = useState<IProductItem[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProductItem[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const printRef = useRef<HTMLDivElement>(null);

    const fectData = async () => {
        try {
            setIsLoading(true);
            const res = await product.getProduct();
            setGetAllProduct(res.data);
            setFilteredProducts(res.data);
            return res;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fectData();
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);

        if (!value.trim()) {
            setFilteredProducts(getAllProduct);
        } else {
            const filtered = getAllProduct.filter(product =>
                product?.pro_name?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleSearch(value);
    };

    const handleExportPDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const columns = getAllProductHeader();

        const tableHTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Product Report</title>
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
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Product Report</h1>
                        <div class="info">
                            Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
                            <br>
                            Total Products: ${filteredProducts.length}
                            ${searchText ? `<br>Filtered by: "${searchText}"` : ''}
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                ${columns.map(col => `<th>${col.title}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredProducts.map(item => `
                                <tr>
                                    ${columns.map(col => {
            let value = '';
            if ('dataIndex' in col && col.dataIndex) {
                const dataIndex = col.dataIndex as keyof IProductItem;
                value = String(item[dataIndex] || '');
            } else if ('render' in col && col.render && typeof col.render === 'function') {
                try {
                    const dataIndex = ('dataIndex' in col ? col.dataIndex : '') as keyof IProductItem;
                    const cellValue = dataIndex ? item[dataIndex] : '';
                    value = String(col.render(cellValue, item, 0) || '');
                } catch (e) {
                    value = '';
                }
            }
            return `<td>${value}</td>`;
        }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>This report was generated automatically from the Product Management System</p>
                    </div>
                </body>
            </html>
        `;

        printWindow.document.write(tableHTML);
        printWindow.document.close();

        printWindow.setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const handlePrint = () => {
        window.print();
    };

    const columns = getAllProductHeader();

    return (
        <div>
            <Table
                loading={isLoading}
                className="bg-white rounded-lg"
                title={() => {
                    return (
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <div className="font-bold text-xl">
                                    Report Product
                                </div>
                                <div>
                                    <Input.Search
                                        size="large"
                                        placeholder="Search products by name..."
                                        value={searchText}
                                        onChange={handleSearchChange}
                                        onSearch={handleSearch}
                                        allowClear
                                        style={{ width: 300 }}
                                    />
                                </div>
                            </div>
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
                dataSource={filteredProducts}
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default ReportProduct;