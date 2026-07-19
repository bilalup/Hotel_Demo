import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Page Not Found</h1>
      <p className="mt-3 max-w-sm text-sm text-stone">
        The page you're looking for seems to have wandered off the map.
      </p>
      <Button as={Link} to="/" variant="primary" className="mt-8">
        Return Home
      </Button>
    </div>
  );
}
