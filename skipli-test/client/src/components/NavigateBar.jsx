import { Avatar, Button, Dropdown, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const NavigateBar = memo((props) => {
  const { onSearch, user } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth", null);
    navigate("/");
  };

  return (
    <div className="p-2 px-6 w-full bg-blue-600 flex justify-between items-center">
      <div>
        <Search
          onSearch={onSearch}
          type="text"
          placeholder="Search github"
          style={{ width: 400 }}
          enterButton="Search"
        />
      </div>
      <div>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <div>
                    <p className="font-bold">
                      Liked githubs: {user?.favorite_github_users?.length}
                    </p>
                    {user?.favorite_github_users?.map((i) => (
                      <p>{i}</p>
                    ))}
                  </div>
                ),
                key: "0",
              },
              {
                type: "divider",
              },
              {
                label: (
                  <p className="text-blue-500 font-bold">
                    {localStorage.getItem("auth")}
                  </p>
                ),
                key: "3",
              },
              {
                label: <Button onClick={handleLogout}>Log out</Button>,
                key: "1",
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
});

export default NavigateBar;
