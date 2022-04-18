const Navbar = () => {
  return (
    <nav className="bg-blue-300 p-4">
      <div class="mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold hover:cursor-pointer hover:text-white">
            Message Board
          </h3>
        </div>
        <div className="">
          <ul className="flex font-medium">
            <li className="px-2 mx-2 hover:underline hover:cursor-pointer hover:text-white">
              Home
            </li>
            <li className="px-2 mx-2 hover:underline hover:cursor-pointer hover:text-white">
              Create
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
