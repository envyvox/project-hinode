import Sidebar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <div className="container flex-1 items-start py-6 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    <Sidebar />
    {children}
  </div>
);

export default RootLayout;
