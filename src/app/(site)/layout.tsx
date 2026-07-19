import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteLoader from "@/components/SiteLoader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteLoader />
      <SmoothScroll />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
