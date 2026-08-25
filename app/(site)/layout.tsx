import Header from "../components/Header";
import Footer from "../components/Footer";
import ContionousNewsTtile from "../components/ContionousNewsTtile";
import AdPopup from "../components/ad";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ContionousNewsTtile></ContionousNewsTtile>
      <AdPopup></AdPopup>
      {children}
      <Footer />
    </>
  );
}