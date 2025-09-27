import PageHeader from "@/components/page-header";
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer className="mt-auto py-8 text-center">
        Footer
      </footer>
    </>
  );
}
