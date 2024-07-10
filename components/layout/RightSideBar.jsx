"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@components/Loading";
import UserCard from "@components/cards/UserCard";

const RightSideBar = () => {
  const { isLoaded, userId } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [allUser, setAllUser] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data);
      } else {
        toast.error(response?.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getAllUser = async () => {
    try {
      const response = await fetch(`/api/user`);
      const data = await response.json();
      if (response.ok) {
        setAllUser(data);
      } else {
        toast.error(response?.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(userId){
     getAllUser()
     getUser();
    }
  });

  // users who are not following me 
  const suggestedUsers = allUser?.filter(user => currentUser?.following?.find(follow => follow?._id !== user?._id) && user?._id !== currentUser?._id) || [];

  return !isLoaded || isLoading ? (
    <Loading />
  ) : (
    <aside className="h-screen flex flex-col gap-12 sticky top-0 left-0 overflow-auto custom-scrollbar w-1/4 px-6 py-6 max-lg:hidden">
      <section>
        <h1 className="text-heading4-bold mb-4">Following</h1>
        <div className="flex flex-col gap-5 max-h-[30vh] overflow-y-auto custom-scrollbar">
          {currentUser?.following?.length === 0 ? <p className="text-center font-semibold text-light-1 mt-3">No following people</p> : currentUser?.following?.map((user) => (
            <UserCard key={user._id} userData={user} update={getUser} />
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-heading4-bold mb-4">Suggested People</h1>
        <div className="flex flex-col gap-5 max-h-[30vh] overflow-y-auto custom-scrollbar">
          {suggestedUsers?.length === 0 ? <p className="text-center font-semibold text-light-1 mt-3">No Suggested people</p> : suggestedUsers?.map((user) => (
            <UserCard key={user._id} userData={user} update={getUser} />
          ))}
        </div>
      </section>
    </aside>
  );
};
export default RightSideBar;
