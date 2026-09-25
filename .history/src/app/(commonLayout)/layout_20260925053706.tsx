import Navbar from "../components/layout/Navbar";

export default function CommonLayout({ children }: LayoutProps<"/">) {
  return (
      <>
          <Navbar
          {children}
      </>
  );
}
