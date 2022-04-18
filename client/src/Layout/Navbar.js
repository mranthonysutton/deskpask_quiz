const Navbar = () => {
  const listItemStyles =
    'px-2 mx-2 hover:underline hover:cursor-pointer hover:text-white duration-200';

  return (
    <nav className="bg-blue-300 p-4">
      <div className="mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold hover:cursor-pointer hover:text-white duration-200">
            Message Board
          </h3>
        </div>
        <div className="">
          <ul className="flex font-medium">
            <li className={listItemStyles}>Home</li>
            <li className={listItemStyles}>Create</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
