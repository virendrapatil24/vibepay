interface MenuLinksProp {
  name: string;
  path: string;
}

const MenuLinks = ({ name, path }: MenuLinksProp) => {
  return (
    <>
      <a
        href={path}
        className="text-white/70 hover:text-white transition duration-300 ease-in-out"
      >
        {name}
      </a>
    </>
  );
};

export default MenuLinks;
