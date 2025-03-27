import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Api from '../api.ts';

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await Api.register(data);
      navigate('/login');
    } catch (err) {
      console.error('Error register', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Регистрация
      </Typography>
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
            label="Пароль"
            type="password"
            fullWidth
            {...register('password', {
              required: 'Введите пароль',
              minLength: { value: 6, message: 'Минимум 6 символов' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Подтвердите пароль"
            type="password"
            fullWidth
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (value) => value === watch('password') || 'Пароли не совпадают',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Уже есть аккаунт?{' '}
            <Link component={RouterLink} to="/login">
              Войти
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterPage;
