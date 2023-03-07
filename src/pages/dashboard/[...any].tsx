import { AuthFactory } from "@/server-lib/factory/auth";
import { request } from "@/server-lib/services";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const auth = AuthFactory.make();

  request.defaults.headers.common.Authorization = auth
    .getAuthToken(context)
    .toBearer();

  const { isAuth, navigateAs } = await auth.authProps(context);

  if (!isAuth) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  let destination = (area?: string) => `/dashboard/${area}`

  if (navigateAs === 'candidate') {
    return {
      redirect: {
        permanent: false,
        destination: destination('area-candidato')
      }
    }
  }

  if (navigateAs === 'recruiter') {
    return {
      redirect: {
        permanent: false,
        destination: destination('area-recrutador')
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/entrar'
    }
  }
};

const MyJobs = () => {
  window.location.href = "/"
  return <>Whoops</>
};

export default MyJobs;