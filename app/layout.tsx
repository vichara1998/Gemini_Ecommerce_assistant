import "./globle.css";

export const metadata = {
  title: "E-Commerce Chatbot",
  description: "Your virtual assistant for orders, products, shipping, and refunds.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
