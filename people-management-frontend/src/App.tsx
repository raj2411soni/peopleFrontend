
import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm.tsx';
import UpdatePersonForm from './components/UpdatePersonForm.tsx';
import PersonList from './components/PersonList.tsx';
import BulkDeleteForm from './components/BulkDeleteForm.tsx';
import { getPeople, undoDelete } from './services/api';
import UndoDeleteButton from './components/UndoDeleteButton';


interface Person {
  id: number;
  name: string;
  email: string;
}

interface UndoDeleteResponse {
  message: string;
  people?: Person[]; 
}

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]); 
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null); 
  const [deletedPeople, setDeletedPeople] = useState<Person[]>([]); 
  const [change, setChange] = useState<boolean>(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data: Person[] = await getPeople(); 
        setPeople(data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, [change]);

  const handleUndoDelete = async () => {
    try {
      const result: UndoDeleteResponse = await undoDelete(); 

      if (result.message === 'Undo single delete successful') {
        setChange(!change);
      }


      if (result.message === 'Undo bulk delete successful' && Array.isArray(result.people)) {
        setPeople((prevPeople) => [...prevPeople, ...result.people]);
        setDeletedPeople([]);
        setChange(!change);
      }
    } catch (error) {
      console.error('Error undoing delete:', error);
    }
  };

  return (
    //@ts-ignore
    <div>
      <h1>Person Management</h1>
      <PersonForm 
      //@ts-ignore
      setPeople={setPeople} />
      <UpdatePersonForm
        selectedPerson={selectedPerson}
        setPeople={setPeople}
        setSelectedPerson={setSelectedPerson}
      />
      <PersonList
        people={people}
        change={change}
        setPeople={setPeople}
        setSelectedPerson={setSelectedPerson}
        setChange={setChange}
      />
      <BulkDeleteForm
        change={change}
        setChange={setChange}
        people={people}
        setPeople={setPeople}
      />
      <UndoDeleteButton change={change} setChange={setChange} handleUndoDelete={handleUndoDelete} />
    </div>
  );
};

export default App;
