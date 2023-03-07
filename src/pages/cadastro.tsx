import { Register } from "@/presentation/pages/register";
import { GetServerSideProps } from "next";

export default function Cadastro() {
  return <Register />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer;
  if (referer) context.res.setHeader("Set-Cookie", `origin=${referer}; Path=/`);

  return {
    props: {},
  };
};
