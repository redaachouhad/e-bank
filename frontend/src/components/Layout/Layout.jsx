import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <div className="w-full h-[100vh] flex justify-start items-center flex-col">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
