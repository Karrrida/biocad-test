import { useForm, SubmitHandler } from 'react-hook-form';


interface FormInput {
  title: string;
}

const FormInput = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);


  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register('title')} />
    </form>
  );
};


export default FormInput;