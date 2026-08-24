import Header from "../components/Header";
import Footer from "../components/Footer";
import ContionousNewsTtile from "../components/ContionousNewsTtile";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ContionousNewsTtile></ContionousNewsTtile>
      {children}
      <Footer />
    </>
  );
}