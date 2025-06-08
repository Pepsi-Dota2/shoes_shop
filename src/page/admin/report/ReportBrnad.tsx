import React, { useEffect, useState } from "react";
import { getAllBrandHeader } from "./column/header";
import { IGetListBrand } from "../../../types/admin/product/product";
import brand from "../../../api/brand";
import { Button, Input, Table } from "antd";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";

const ReportBrand: React.FC = () => {
    const columns = getAllBrandHeader();
    const [isLoading, setIsLoading] = useState(false);
    const [getBrand, setGetBrand] = useState<IGetListBrand[]>([]);
    const [filteredData, setFilteredData] = useState<IGetListBrand[]>([]);
    const [searchText, setSearchText] = useState("");

    const fetchBrandData = async () => {
        setIsLoading(true);
        try {
            const res = await brand.getAllBrand();
            setGetBrand(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBrandData();
    }, []);
    const handlePrint = () => {
        window.print();
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        if (!value.trim()) {
            setFilteredData(getBrand);
            return;
        }
        const filtered = getBrand.filter(
            (item) =>
                item.brand_name.toLowerCase().includes(value.toLowerCase()) ||
                item.brand_description?.toLowerCase().includes(value.toLowerCase()) ||
                false ||
                item.brand_website?.toLowerCase().includes(value.toLowerCase()) ||
                false
        );

        setFilteredData(filtered);
    };
    return <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Category Report</h1>
            <Button
                type="primary"
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                disabled={isLoading || filteredData.length === 0}
            >
                Print
            </Button>
        </div>
        <Table
            title={() => {
                return (
                    <div>
                        <div className="w-[40%] py-4">
                            <Input
                                placeholder="Search brands"
                                value={searchText}
                                onChange={handleSearch}
                                prefix={<SearchOutlined />}
                                className="w-64"
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="font-bold text-xl">Brand</div>

                        </div>
                    </div>
                );
            }}
            loading={isLoading}
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey="brand_id"
        />
    </div>
}

export default ReportBrand


