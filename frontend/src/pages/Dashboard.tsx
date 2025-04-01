import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Pagination, Button } from '@mui/material';
import Api from '../api.ts';
import ItemList from '../components/ItemList.tsx';
import ItemModal from '../components/ItemModal.tsx';
import { useNotification } from '../context/NotificationContext.tsx';

interface Item {
  id: number;
  title: string;
  authorId: number;
}

const Dashboard: React.FC = () => {

  const { showNotification } = useNotification();

  const [items, setItems] = useState<Item[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const fetchItems = async (page: number) => {
    setLoading(true);
    try {
      const response = await Api.getItems({ page, perPage: 5 });
      setItems(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      const error = err as { response?: { data?: { message: string } } };
      showNotification(`Ошибка при удалении: ${error?.response?.data?.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setOpenModal(true);
  };

  const handleEdit = (item: Item): void => {
    setCurrentItem(item);
    setOpenModal(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await Api.deleteItem(id);
      await fetchItems(page);
      showNotification(`Запись удалена`, 'success');
    } catch (err) {
      const error = err as { response?: { data?: { message: string } } };
      showNotification(`Ошибка при удалении: ${error?.response?.data?.message}`, 'error');
    }


  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSaveItem = async (data: Item) => {
    if (currentItem) {
      try {
        const updateItem = await Api.updateItem(currentItem.id, data);
        fetchItems(page);
        showNotification(`Запись изменена: ${updateItem.id}`, 'info');
      } catch (err) {
        const error = err as { response?: { data?: { message: string } } };
        showNotification(`Ошибка при редактировании: ${error?.response?.data?.message}`, 'error');
      }
    } else {
      try {
        const newItem = await Api.createItem(data);
        setItems((prevState) => [...prevState, newItem]);
        fetchItems(page);
        showNotification(`Запись создана: ${newItem.id}`, 'info');
      } catch (err) {
        const error = err as { response?: { data?: { message: string } } };
        showNotification(`Ошибка при создании: ${error?.response?.data?.message}`, 'error');
      }
    }
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={handleAdd}>Создать</Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ marginTop: 2 }}
      />
      <ItemModal
        open={openModal}
        onClose={handleClose}
        onSubmit={handleSaveItem}
        initialData={currentItem || { id: 0, title: '', authorId: 0 }}
      />
    </Container>
  );
};

export default Dashboard;