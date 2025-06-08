import LoginPage from "../page/auth/Login";
import RegisterPage from "../page/auth/register";
import Dashboard from "../page/admin/home/Home";
import SupplierPage from "../page/admin/proudct/Subplier";
import { IRoute } from "../types/route.type";
import ProductClientPage from "../page/client/home/Home";
import CategoryPage from "../page/admin/proudct/Category";
import CreateCategory from "../page/admin/proudct/component/CreateCategory";
import CreateProduct from "../page/admin/proudct/component/CreateProduct";
import Status from "../page/admin/order";
import CreateSupplier from "../page/admin/proudct/component/CreateSupplier";
import ProductPage from "../page/admin/proudct/product";
import ProductDetail from "../page/client/home/component/ProductDetail";
import CartPage from "../page/client/cart/Cart";
import BrandPage from "../page/admin/brand/BrandPage";
import CreateBrand from "../page/admin/brand/component/CreateBrand";
import Products from "../page/client/products/Products";
import ReportProduct from "../page/admin/report/ReportProduct";
import ReportCustomer from "../page/admin/report/ReportCustomer";
import ReportBrand from "../page/admin/report/ReportBrnad";
import ReportSupplier from "../page/admin/report/ReportSuplier";
import Customer from "../page/admin/customer/Customer";
import ImportProduct from "../page/admin/import/Import_product";
import AddImportProduct from "../page/admin/import/component/CreateProduct";
import LaoDataTable from "../page/admin/report/PreOrder";
import RePortOrderBilling from "../page/admin/report/ReportOrderBilling";
export const ROUTES: IRoute[] = [
  {
    path: "/Dashboard",
    title: "Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/product/all",
    title: "Admin product ",
    component: <ProductPage />,
  },
  {
    path: "/product/create",
    title: "Admin create product ",
    component: <CreateProduct />,
  },
  {
    path: "/product/edit/:id",
    title: "Admin edit product ",
    component: <CreateProduct />,
  },
  {
    path: "/product/category",
    title: "Admin category",
    component: <CategoryPage />,
  },
  {
    path: "/product/create/category",
    title: "Admin create category",
    component: <CreateCategory />,
  },
  {
    path: "/product/edit/category/:id",
    title: "Admin update category",
    component: <CreateCategory />,
  },
  {
    path: "/product/supplier",
    title: "Admin supplier",
    component: <SupplierPage />,
  },
  {
    path: "/product/create/supplier",
    title: "Admin supplier",
    component: <CreateSupplier />,
  },
  {
    path: "/product/edit/supplier/:id",
    title: "Admin supplier",
    component: <CreateSupplier />,
  },
  {
    path: "/order/status",
    title: "Admin supplier",
    component: <Status />,
  },
  {
    path: "/product/brand",
    title: "Admin Brand",
    component: <BrandPage />,
  },
  {
    path: "/product/create/brand",
    title: "Admin Brand",
    component: <CreateBrand />,
  },
  {
    path: "/product/update/brand/:id",
    title: "Admin Brand",
    component: <CreateBrand />,
  },
  {
    path: "/report/product",
    title: "Report Product",
    component: <ReportProduct />,
  },
  {
    path: "/report/customer",
    title: "Report customer",
    component: <ReportCustomer />,
  },
  {
    path: "/report/category",
    title: "Report customer",
    component: <ReportCustomer />,
  },
  {
    path: "/report/brand",
    title: "Report customer",
    component: <ReportBrand />,
  },
  {
    path: "/report/supplier",
    title: "Report customer",
    component: <ReportSupplier />,
  },
  {
    path: "/customer",
    title: "customer",
    component: <Customer />,
  },
  {
    path: "/import",
    title: "Import",
    component: <ImportProduct />,
  },
  {
    path: "/import/create",
    title: "Import create",
    component: < AddImportProduct />,
  },
  {
    path: "/import/edit/:id",
    title: "Import update",
    component: <AddImportProduct />
  },
  {
    path: "/report/billing",
    title: "Billing",
    component: <LaoDataTable />
  },
  {
    path: "/report/reportOrderbilling",
    title: "Billing",
    component: <RePortOrderBilling />
  }

];

export const AUTH_ROUTES: IRoute[] = [
  {
    path: "/",
    title: "Shop",
    component: <ProductClientPage />,
    showInMenu: true,
  },
  {
    path: "/product",
    title: "product",
    component: <Products />,
    showInMenu: true,
  },
  {
    path: "/products/:id",
    title: "product detail",
    component: <ProductDetail />,
    showInMenu: false,
  },
  {
    path: "/cart",
    title: "cart",
    component: <CartPage />,
    showInMenu: true,
  },
  {
    path: "/login",
    title: "Login",
    component: <LoginPage />,
  },
  {
    path: "/register",
    title: "Register",
    component: <RegisterPage />,
  },

];
