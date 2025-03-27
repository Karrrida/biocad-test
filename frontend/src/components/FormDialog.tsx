import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormDialogProps {
  open: boolean;
  initialData: {
    description: string;
    text: string;
    id: number
  };
  onClose: () => void;
  onSubmit: (data: { description: string, text: string, id: number }) => void;
}

const FormDialog = ({ open, initialData, onClose, onSubmit }: FormDialogProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialData });


  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit = (data: { description: string, text: string, id: number }) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать запись</DialogTitle>
      <DialogContent>
        <form id='edit-form' onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Описание"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required: 'required',
            })}
          />
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Описание"
            error={!!errors.text}
            helperText={errors.text?.message}
            {...register('text', {
              required: 'required',
            })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form='edit-form' variant='contained'>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;