import DesktopSidebar from "@/components/desktop-sidebar";
import GameProviders from "@/components/game-providers";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <GameProviders>
    <div className="container grid md:grid-cols-7">
      <DesktopSidebar className="hidden md:col-span-2 md:block lg:col-span-1" />
      <div className="col-span-3 px-4 py-6 md:col-span-5 lg:col-span-6">
        {children}
      </div>
    </div>
  </GameProviders>
);

export default RootLayout;
