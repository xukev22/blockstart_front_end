import { useParams, useLoaderData, LoaderFunction } from "react-router-dom";

const CollegeProfile = () => {
  const params = useParams();
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      <h1>College Profile!</h1>
      <p>{params.collegeName}</p>
    </>
  );
};

export default CollegeProfile;

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8080/colleges/getDetailsForCollegeByName?collegeName=${params.collegeName}`
  );
  if (!response.ok) {
    throw new Error("Getting college by name failed!");
  } else {
    const resData = await response.json();
    return resData;
  }
};
