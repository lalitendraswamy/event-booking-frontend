import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/features/authentication/UserSlice";
import Navbar from "../shared/navbar/navbar";
import Footer from "../shared/footer/eventsFooter";
import UserTable from "./UserTable";
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import "./user-page.css";
import Spinner from "../shared/spinner/spinner";
import { getCookie } from "../../utils/cookieUtils";
import AdminNav from "../shared/adminNav/adminNav";

export default function Userpage() {
  let { users } = useSelector((s: any) => s.users);

  let [usersList, setUsersList] = useState(users);
  // usersList=usersList.filter((user: { userId: string; })=> user.userId!== getCookie('userId'))

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredUsers = users.filter(
      (user: { username: string; email: string }) =>
        user.username.toLowerCase().includes(query) || // Adjust the property based on your user object
        user.email.toLowerCase().includes(query) // Example property
    );
    setUsersList(filteredUsers);
  };

  return (
    
        
     
        <div>
          <Navbar />
          <div className="admin-bg p-3">
            <AdminNav />
            <div className="admin-content">
              <div className="user-page">
                <div className="user-page-top-card d-flex justify-content-between">
                  <h3>Users List</h3>
                  <div className="user-search">
                    <input
                      className="h-100 me-0"
                      type="search"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search by name or email"
                    />
                    <button>
                      {" "}
                      <ImSearch
                        style={{ color: "#0056B3", fontSize: "30px" }}
                      />{" "}
                    </button>
                  </div>
                
                </div>

                {usersList.length > 0 ? (
                  <UserTable users={usersList} /> // Pass the filtered users
                ) : (
                  <div
                    className="users-not-found"
                    style={{ fontSize: "50px", color: "#0056B3" }}
                  >
                    <h3>No users found!</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      
  );
}
