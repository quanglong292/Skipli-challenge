import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeGithubAPI, searchGithubAPI } from "../api/search.apit";
import { getMeAPI } from "../api/user";

import NavigateBar from "../components/NavigateBar";
import Table from "../components/Table";

// Components

const SearchGithub = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    favorite_github_users: [],
  });

  const fetchMe = async () => {
    setLoading(true);
    const phone = localStorage.getItem("auth").split(" ").join("");
    const data = await getMeAPI(phone);
    console.log("fetchMe", data);
    setUserInfo(data);
    setLoading(false);
  };

  const handleFetchData = async (search = "a") => {
    setLoading(true);
    const { data } = await searchGithubAPI({ per_page: 50, page, q: search || "a" });
    // console.log("handleFetchData", data);
    setTableData(data);
    setLoading(false);
    return data;
  };

  const handleClickLike = async (record) => {
    const { id } = record;
    let { favorite_github_users } = userInfo;
    const isLiked = favorite_github_users.find((i) => i === id);

    if (!favorite_github_users.length) favorite_github_users = [id];
    else if (isLiked)
      favorite_github_users = favorite_github_users.filter((i) => i !== id);
    else favorite_github_users = [...favorite_github_users, id];

    setUserInfo({ ...userInfo, favorite_github_users });
    // console.log("favorite_github_users", favorite_github_users);

    await likeGithubAPI({ ids: favorite_github_users, phone: userInfo.phone });
  };

  const onSearch = async (e) => {
    // console.log("onSearch", e);
    await handleFetchData(e);
  };

  useEffect(() => {
    // if (!localStorage.getItem("auth")) navigate("/");
    handleFetchData();
    fetchMe();
  }, []);
  return (
    <div>
      <NavigateBar onSearch={onSearch} user={userInfo} />
      <div className="p-4 max-h-[80%]">
        <Table
          loading={loading}
          data={tableData}
          user={userInfo}
          handleClickLike={handleClickLike}
          setPage={(page, size) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default SearchGithub;
