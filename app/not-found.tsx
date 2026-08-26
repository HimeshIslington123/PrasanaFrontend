import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContionousNewsTtile from "./components/ContionousNewsTtile";
export default function NotFound(){
     return(<>
     <Header></Header>
     <ContionousNewsTtile></ContionousNewsTtile>
      <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
      >
        Go Back Home
      </Link>
    </main>
    <Footer></Footer>
    </>)

}
