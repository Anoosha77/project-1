type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-blue-600 text-white p-4 text-center text-2xl font-semibold">
      {title}
    </header>
  );
};

export default Header;
