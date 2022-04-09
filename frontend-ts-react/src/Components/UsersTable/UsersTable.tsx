import { Avatar, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks/use-store";
import { apiService } from "../../services/api_service";
import CustomTable from "./CustomTable";

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  position: string;
  photo: string;
}

const UsersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totalUsersFromApi, setTotalUsersFromApi] = useState(0);
  const [fetchEror, setFetchEror] = useState(false);
  const [loading, setLoading] = useState(true);
  const store = useStore();

  useEffect(() => {
    apiService
      .getUsers(page + 1, rowsPerPage)
      .then((resp) => {
        let usersArr: User[] = resp.users;
        setTotalUsersFromApi(resp.total_users);
        store.setRowsFoCurrentPage(usersArr);
        setLoading(false);
        // console.log(rowsArr);
      })
      .catch((err) => {
        console.log("request failed", err);
        setLoading(false);
        setFetchEror(true);
      });
  }, [page]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createUserRow = (
    name: string,
    id: number,
    email: string,
    postion: string,
    phone: string,
    photo: string
  ): (string | number | JSX.Element)[] => {
    return [name, id, email, postion, phone, getAvatarFromUrl(photo, name)];
  };

  const getAvatarFromUrl = (photoURL: string, name: string): JSX.Element => {
    return <Avatar alt={name} src={photoURL} />;
  };

  const mapUsersToUserRows = (users: User[]) => {
    let rowsArr = [];
    for (let index = 0; index < users.length; index++) {
      let user = users[index];
      rowsArr.push(
        createUserRow(
          user.name,
          user.id,
          user.email,
          user.position,
          user.phone,
          user.photo
        )
      );
    }

    return rowsArr;
  };

  const columnsData = [
    { name: "Name", width: "15%" },
    { name: "ID", width: "5%", align: "left" },
    { name: "Email", width: "30%", align: "left" },
    { name: "Position", width: "20%", align: "left" },
    { name: "Phone", align: "left" },
    { name: "Photo", align: "right" },
  ];

  return (
    <>
      {loading && (
        <Typography variant="h4" component="h4">
          Loading...
        </Typography>
      )}
      {fetchEror && (
        <Typography variant="h4" component="h4">
          Data fetch error!
        </Typography>
      )}
      {!fetchEror && !loading && (
        <CustomTable
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalUsersFromApi}
          columnsData={columnsData}
          rowsData={mapUsersToUserRows(store.rowsForCurrentPage.toJSON())}
          handleChangePage={handleChangePage}
        ></CustomTable>
      )}
    </>
  );
};

export default observer(UsersTable);
