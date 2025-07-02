import { useTranslation } from "react-i18next";
import { switchLanguage } from "../../utils/SwitchLang.util";
import { AppImage } from "../../config/constant";
import { Avatar, Button, Dropdown, Menu, MenuProps, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ChangePassword from "../../page/auth/ChangePassword";
import ViewHistoryCus from "../../page/client/VIewHistory";
type MenuItem = {
  key: string;
  label: string;
  onClick: () => void;
};
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isClient?: boolean;
  menuBarClient?: MenuItem[];
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Change Password",
      onClick: () => {
        setIsModalVisible(true);
      },
    },
    {
      key: "2",
      label: "View History Order",
      onClick: () => {
        setIsHistoryVisible(true); // ✅ Show modal
      },
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-999 flex w-full drop-shadow-1 bg-white shadow-md">
        <div className="flex flex-grow items-center  px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          {/* <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm  bg-white p-1.5 shadow-sm  lg:hidden"
            >
              <img src={AppImage.iconMenu} alt="Menu" className="h-5 w-5 " />
            </button>
          </div> */}
          <div />
          <div className="flex flex-grow items-center justify-start">
            {props.isClient && <h1 className="text-xl font-bold ">E-shop</h1>}
            {props.isClient && (
              <div className="flex items-center">
                <Menu
                  mode="horizontal"
                  selectedKeys={[location.pathname]}
                  className="border-none"
                  items={props.menuBarClient}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <div className="flex items-center gap-2 2xsm:gap-4">
              {props.isClient && (
                <div className="flex justify-end items-center gap-2 w-full ">
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </div>
              )}
              <div onClick={switchLanguage} className="cursor-pointer w-full">
                {i18n.language === "la" ? (
                  <img
                    src={AppImage.flagEnglish}
                    alt="English"
                    className="h-8 w-8 object-cover rounded-full"
                    title="English"
                  />
                ) : (
                  <img
                    src={AppImage.flagLaos}
                    alt="ພາສາລາວ"
                    className="h-8 w-8 object-cover rounded-full"
                    title="ພາສາລາວ"
                  />
                )}
              </div>
              <div>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        title="Change Password"
      >
        <ChangePassword onSuccess={() => setIsModalVisible(false)} />
      </Modal>
      <Modal
        open={isHistoryVisible}
        onCancel={() => setIsHistoryVisible(false)}
        footer={null}
        title="Order History"
        width={800} // wider for better viewing
      >
        <ViewHistoryCus />
      </Modal>
    </>
  );
};

export default Header;
