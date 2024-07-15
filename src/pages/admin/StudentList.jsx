import useSWR from "swr";
import axios from "../../api/axios";

export default function StudentList() {
  let fetcher = (url) =>
    axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });

  const {
    data: students,
    isLoading,
    error,
  } = useSWR("/api/v1/students", fetcher);

  return (
    <>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students?.data.map((data) => (
            <>
              <tr>
                <td>{data.student.studentFirstname}</td>
                <td>{data.email}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
