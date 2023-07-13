import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <div style={{ marginTop: "5rem" }}>
        <h1>Something went wrong!</h1>
      </div>
    </>
  );
};

export default ErrorPage;
