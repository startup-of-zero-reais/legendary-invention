import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
  password: Yup.string().required("Obrigatório"),
});
