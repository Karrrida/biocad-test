import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Item } from '../types/types.ts';

interface ItemModalProps {
  open: boolean;
  initialData: Item;
  onClose: () => void;
  onSubmit: (data: Item) => void;
}


const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, onSubmit, initialData }) => {
  const {
    register
    , handleSubmit
    , formState: { errors }
    , reset,
  }
    = useForm({
    defaultValues: {
      title: initialData?.title,
      id: initialData?.id,
      authorId: initialData?.authorId,
    },
  });

  useEffect(() => {
    reset({ title: initialData?.title });
  }, [initialData]);

  const handleSave = (data: Item) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Запись'}</DialogTitle>
      <DialogContent>
        <form id="edit-form" onSubmit={handleSubmit(handleSave)}>
          <TextField
            fullWidth
            margin="dense"
            label="Текст"
            error={!!errors.title}
            helperText={errors?.title?.message}
            {...register('title', {
              required: 'required',
            })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button type="submit" form="edit-form" variant="contained" color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemModal;
