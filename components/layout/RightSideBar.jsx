const RightSideBar = () => {
  return (
    <aside className="h-screen flex flex-col gap-12 sticky top-0 left-0 overflow-auto custom-scrollbar px-6 py-6 max-md:hidden">
      <div>
        <h1 className="text-heading4-bold mb-4">Following</h1>
        <p>user list</p>
      </div>
      <div>
        <h1 className="text-heading4-bold mb-4">Suggested People</h1>
        <p>user list</p>
      </div>
    </aside>
  );
};
export default RightSideBar;
