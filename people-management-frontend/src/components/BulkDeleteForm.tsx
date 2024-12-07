
import React, { useState } from "react";
import { bulkDeletePeople } from "../services/api";

interface Person {
  id: number;
  name: string;
}

interface BulkDeleteFormProps {
  change: boolean;
  setchange: React.Dispatch<React.SetStateAction<boolean>>;
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

const BulkDeleteForm: React.FC<BulkDeleteFormProps> = ({ change, setchange, people, setPeople }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await bulkDeletePeople(selectedIds);
      setPeople(people.filter((person) => !selectedIds.includes(person.id)));
      setchange(!change); 
    } catch (error) {
      console.error("Error bulk deleting people:", error);
    }
  };

  return (
    <div>
      <h3>Bulk Delete People</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              <input
                type="checkbox"
                checked={selectedIds.includes(person.id)}
                onChange={() => handleSelect(person.id)}
              />
              {person.name}
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleBulkDelete}>
          Bulk Delete
        </button>
      </form>
    </div>
  );
};

export default BulkDeleteForm;
