import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 text-white">
      <h1 className="text-8xl font-bold text-indigo-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button
        as={Link}
        to="/"
        color="primary"
        variant="solid"
        size="lg"
        startContent={<FiHome />}
        className="mt-8 bg-indigo-600"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
