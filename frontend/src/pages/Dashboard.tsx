import { List, ListItem, ListItemText, Divider, CircularProgress, Box, Alert, Typography, Button } from '@mui/material';
import Api from '../api.ts';
import { Fragment, useEffect, useState } from 'react';
import FormDialog from '../components/FormDialog.tsx';

interface Items {
  id: number;
  description: string;
  text: string;
}

const Dashboard = () => {
  const [items, setItems] = useState<Items[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Items | null>(null);

  const handleEditClick = (item: Items) => setEditingItem(item)
  const handleSave = async (updatedData: { description: string, text: string, id: number }) => {

    if (!editingItem) {
      return;
    }
    const response =  await Api.updateItem(editingItem.id, updatedData);
    console.log(response);
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const data: Items[] = await Api.getItems();
        setItems(data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    getAll();

  }, []);

  return (
    <>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ margin: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <List sx={{ width: '100%', margin: '20px', bgcolor: 'background.paper' }}>
          {items.map((item, index) => (
            <Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={item.description}
                  secondary={item.text}
                />
              </ListItem>
              <Button variant="contained" size="small" onClick={() => handleEditClick(item)}>Редактировать</Button>
              {index !== items.length - 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      )}

      {!loading && !error && items.length === 0 && (
        <Typography variant="body1" align="center" mt={4}>
          Нет данных для отображения
        </Typography>
      )}

      {editingItem && (
        <FormDialog
          open={!!editingItem}
          initialData={editingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={handleSave}
        ></FormDialog>
      )}
    </>
  );
};

export default Dashboard;