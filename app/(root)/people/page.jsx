"use client";

import UserCard from "@components/cards/UserCard";
import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allUser, setAllUser] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(`/api/user`);
      const data = await response.json();
      if(response.ok) {
        setAllUser(data);
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  },[]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="flex flex-col gap-5">
      {allUser.map((user) => (
        <UserCard key={user._id} userData={user} update={getUsers} />
      ))}
    </section>
  );
};
export default People;
