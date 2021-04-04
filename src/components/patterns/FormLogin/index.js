import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { Button } from '../../commons/Button';
import TextField from '../../commons/TextField';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { loginService } from '../../../services/login/loginService';

const loginSchema = yup.object().shape({
  usuario: yup.string()
    .min(3, 'Preencha pelo menos 3 caracteres')
    .required('Campo obrigatório'),
  senha: yup.string()
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres')
    .required('Campo obrigatório'),
});

// eslint-disable-next-line react/prop-types
export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const initialValues = {
    usuario: '',
    senha: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      }).then(() => {
        router.push('/app/profile');
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('erro no login.', err);
      }).finally(() => form.setIsFormDisabled(false));
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <form id="formCadastro" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={form.values.usuario}
        error={form.errors.usuario}
        isTouched={form.touched.usuario}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        error={form.errors.senha}
        isTouched={form.touched.senha}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}
