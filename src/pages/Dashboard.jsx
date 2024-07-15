import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { user } = useOutletContext();
  const data = [1, 2].includes(user.data.roleId)
    ? user.data.schoolPersonnel
    : user.data.student;

  console.log(data.studentFirstname);

  return (
    <>
      <h1>
        Hi,
        <small>
          {[1, 2].includes(user.data.roleId)
            ? data.spFirstname
            : data.studentFirstname}
        </small>
      </h1>
      <h1>Dashboard Page</h1>
    </>
  );
}
