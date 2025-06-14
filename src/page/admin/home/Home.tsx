import { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { Chart } from 'chart.js/auto';
import dashboard from "../../../api/dashboard";
import { getCategoryHeader, getInventoryHeader } from "./column/column";
import order from "../../../api/order";
import { IDashBoard } from "../../../types/admin/dashboard";

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

interface ChartData {
  status: OrderStatus;
  count: number;
}

const Dashboard: React.FC = () => {
  const [dashbaordOrder, setDashboardOrder] = useState<IDashBoard[]>([]);
  const [dataChart, setDatachart] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [pieChartInstance, setPieChartInstance] = useState<Chart | null>(null);

  // Define status colors based on priority
  const statusColors: Record<OrderStatus, { bg: string; border: string }> = {
    pending: {
      bg: 'rgba(255, 193, 7, 0.5)',    // Yellow
      border: 'rgba(255, 193, 7, 1)'
    },
    processing: {
      bg: 'rgba(13, 110, 253, 0.5)',   // Blue
      border: 'rgba(13, 110, 253, 1)'
    },
    completed: {
      bg: 'rgba(25, 135, 84, 0.5)',    // Green
      border: 'rgba(25, 135, 84, 1)'
    },
    cancelled: {
      bg: 'rgba(220, 53, 69, 0.5)',    // Red
      border: 'rgba(220, 53, 69, 1)'
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await dashboard.getDashboard();
      const orders = response.data.orders;
      const inventory = response.data.inventory;

      setDashboardOrder([
        { orders, revenue: response.data.revenue, inventory },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const fetchChart = async () => {
    try {
      const response = await dashboard.getDashboard();
      const orders = response.data.orders;
      const formattedOrders = Object.keys(orders).map((key) => ({
        status: key as OrderStatus,
        count: orders[key],
      }));
      setDatachart(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const fectBestSeller = async () => {
    try {
      const response = await order.bestSeller();
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchChart(), fectBestSeller()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataChart.length > 0 && !chartInstance) {
      const ctx = document.getElementById('orderChart') as HTMLCanvasElement;
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dataChart.map(row => row.status),
            datasets: [{
              label: 'Orders by Status',
              data: dataChart.map(row => row.count),
              backgroundColor: dataChart.map(row =>
                statusColors[row.status.toLowerCase() as OrderStatus]?.bg || 'rgba(54, 162, 235, 0.5)'
              ),
              borderColor: dataChart.map(row =>
                statusColors[row.status.toLowerCase() as OrderStatus]?.border || 'rgba(54, 162, 235, 1)'
              ),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Order Statistics'
              },
              legend: {
                display: true,
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Orders'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Order Status'
                }
              }
            }
          }
        });
        setChartInstance(newChart);
      }
    }
  }, [dataChart, chartInstance]);

  useEffect(() => {
    if (dataChart.length > 0 && !pieChartInstance) {
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      if (ctx) {
        const newPieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: dataChart.map(row => row.status),
            datasets: [{
              data: dataChart.map(row => row.count),
              backgroundColor: dataChart.map(row =>
                statusColors[row.status.toLowerCase() as OrderStatus]?.bg || 'rgba(54, 162, 235, 0.5)'
              ),
              borderColor: dataChart.map(row =>
                statusColors[row.status.toLowerCase() as OrderStatus]?.border || 'rgba(54, 162, 235, 1)'
              ),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Payment Distribution'
              },
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
        setPieChartInstance(newPieChart);
      }
    }
  }, [dataChart, pieChartInstance]);

  const column = getCategoryHeader();
  const inventory = getInventoryHeader();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dashbaordOrder.map((item) => (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">{item.revenue.toLocaleString()} Kip</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(item.orders).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Products</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(item.inventory).reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Statistics</h2>
            <div className="h-[400px]">
              <canvas id="orderChart"></canvas>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Distribution</h2>
            <div className="h-[400px]">
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
              </div>
              <Table
                className="p-6"
                columns={column}
                dataSource={dashbaordOrder}
                scroll={{ x: "calc(400px + 50%)", y: 47 * 5 }}
                pagination={false}
              />
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Stock</h2>
              </div>
              <Table
                className="p-6"
                columns={inventory}
                dataSource={dashbaordOrder}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
