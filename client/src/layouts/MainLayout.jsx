import Header from "../components/admin/Header";
import Footer from "../components/shared/Footer";
import ActionButtons from "../components/user/ActionButtons";
import TitleHeader from "../components/user/TitleHeader";
import VotingCard from "../components/user/VotingCard";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <TitleHeader />

      <main className="bg-gray-50 flex flex-col items-center flex-grow gap-10 p-6">
        <VotingCard />
        <ActionButtons />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
