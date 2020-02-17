import React, { useEffect, useState } from "react";
import UserList from "../component/UserList";
import { GET_USERS } from "../../shared/util/path";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hook/httpHook";

const User = () => {
  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();
  const [userItemList, setUserItemList] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(GET_USERS);
        setUserItemList(responseData.users);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {loadingVisibility && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loadingVisibility && userItemList && (
        <UserList userItemList={userItemList} />
      )}
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default User;
