
export default function CommonLayout({ children }: LayoutProps<"/">) {
  return (
      <>
          <Navbar
          {children}
      </>
  );
}
