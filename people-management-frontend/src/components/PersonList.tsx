

import React, { useState } from 'react';
import { deletePerson, addAddress } from '../services/api';

interface Person {
  id: number;
  name: string;
  email: string;
}

interface PersonListProps {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  setSelectedPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  setChange: React.Dispatch<React.SetStateAction<Person | null>>;
}

const PersonList: React.FC<PersonListProps> = ({ people, setPeople, setSelectedPerson,setChange }) => {
  const [addressForm, setAddressForm] = useState({
    person_id: '',
    address: '',
    is_primary: false,
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deletePerson(id);
      setPeople(people.filter((person) => person.id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleAddAddress = (personId: number) => {
    setAddressForm({ ...addressForm, person_id: personId.toString() });
    setShowAddressForm(true);
    setChange(true)
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { person_id, address, is_primary } = addressForm;

    if (!person_id || !address) {
      console.error('Please provide valid data for person_id and address');
      return;
    }

    try {
      await addAddress({ person_id: parseInt(person_id), address, is_primary });
      setShowAddressForm(false); 
      setAddressForm({ person_id: '', address: '', is_primary: false }); 
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div>
      {showAddressForm && (
        <div>
          <h3>Add Address</h3>
          <form onSubmit={handleAddressSubmit}>
            <input
              type="text"
              placeholder="Address"
              value={addressForm.address}
              onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
            />
            <label>
              Is Primary:
              <input
                type="checkbox"
                checked={addressForm.is_primary}
                onChange={(e) => setAddressForm({ ...addressForm, is_primary: e.target.checked })}
              />
            </label>
            <button type="submit">Submit Address</button>
            <button type="button" onClick={() => setShowAddressForm(false)}>Cancel</button>
          </form>
        </div>
      )}
      <h2>People List</h2>
      <ul>
        {people.map((person: Person) => (
          <li key={person.id}>
            {person.name} - {person.email} -{person?.address?.map((add)=>(
             <div style={{marginRight:"10px"}}> {add.address}</div>
            ))}
            <button onClick={() => setSelectedPerson(person)}>Update</button>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
            <button onClick={() => handleAddAddress(person.id)}>Add Address</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PersonList;
