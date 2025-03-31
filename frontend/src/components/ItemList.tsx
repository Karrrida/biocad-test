import { List, ListItem, ListItemText, Button } from '@mui/material';
import React from 'react';

interface Item {
  id: number;
  title: string;
  authorId: number;
}

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.title} />
          <Button variant="contained" sx={{ mr: '5px' }} onClick={() => onEdit(item)}>Редактировать</Button>
          <Button variant="outlined" color="error" onClick={() => onDelete(item.id)}>Удалить</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;