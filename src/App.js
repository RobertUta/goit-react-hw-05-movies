import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import ContactList from './components/ContactsList/ContactList';
import Filter from './components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const formSubmitHandler = data => {
    const isRepeat = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isRepeat) {
      alert('contact is already in the directory');
      return;
    }
    setContacts([data, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
