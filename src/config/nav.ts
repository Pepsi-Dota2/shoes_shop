import { IMenu } from "../types/route.type";

export const MENU = (t: any): Array<IMenu> => [
  {
    name: t("Dashboard"),
    path: "/dashboard",
    icon: "",
  },
  {
    name: t("List product"),
    path: "/product",
    icon: "",
    subs: [
      {
        name: "product all",
        path: "/product/all",
        icon: "",
      },
      {
        name: "category product",
        path: "/product/category",
        icon: "",
      },
      {
        name: "supplier product",
        path: "/product/supplier",
        icon: "",
      },
      {
        name: "bradnd product",
        path: "/product/brand",
        icon: "",
      },
    ],
  },

  {
    name: t("Customer"),
    path: "/customer",
    icon: "",
  },
  {
    name: t("Import"),
    path: "/import",
    icon: "",
  },

  {
    name: t("OrderStatus"),
    path: "/order/status",
    icon: "",
  },
  {
    name: t("Report"),
    path: "/report",
    icon: "",
    subs: [
      {
        name: "Report Product",
        path: "/report/product",
        icon: "",
      },
      {
        name: "Report Billing",
        path: "/report/billing",
        icon: "",
      },
      {
        name: "Report Category",
        path: "/report/category",
        icon: "",
      },
      {
        name: "Report Customer",
        path: "/report/customer",
        icon: "",
      },
      {
        name: "Report Brand",
        path: "/report/brand",
        icon: "",
      },
      {
        name: "Report Supplierr",
        path: "/report/supplier",
        icon: "",
      },
      {
        name: "Report OrderBilling",
        path: "/report/reportOrderbilling",
        icon: "",
      },
    ],
  },

];
