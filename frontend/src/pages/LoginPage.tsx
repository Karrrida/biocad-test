import { Container, Typography, Button, TextField, Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import Api from '../api.ts';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.tsx';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

type LoginPageInputs = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPageInputs>();
  const onSubmit = async (data: LoginPageInputs) => {
   try{
     await Api.login(data);
     authContext?.login();
     navigate('/dashboard');
   }catch(err){
     console.warn('Error login', err);
   }
  };


  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Вход</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="Email"
            fullWidth
            {...register('email', { required: 'Введите email' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box mb={2}>
          <TextField
            type='password'
            label="Password"
            fullWidth
            {...register('password', { required: 'Введите пароль' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Button type="submit" variant="contained">Войти</Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Нет аккаунта?{' '}
            <Link component={RouterLink} to="/register">
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;