import { Link } from "react-router";

export default function Header() {
  return (
    <footer>
      <Link to="/">Home</Link>
      <Link to="/add-book">Add book</Link>
    </footer>
  );
}