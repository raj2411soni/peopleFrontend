
import React, { useState, useEffect } from "react";
import { updatePerson } from "../services/api";


interface Person {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}


interface UpdatePersonFormProps {
  selectedPerson: Person | null; 
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>; 
  setSelectedPerson: React.Dispatch<React.SetStateAction<Person | null>>; 
}

const UpdatePersonForm: React.FC<UpdatePersonFormProps> = ({
  selectedPerson,
  setPeople,
  setSelectedPerson,
}) => {
  const [name, setName] = useState<string>(selectedPerson ? selectedPerson.name : "");
  const [email, setEmail] = useState<string>(selectedPerson ? selectedPerson.email : "");
  const [phone_number, setPhone] = useState<string>(
    selectedPerson ? selectedPerson.phone_number : ""
  );

  useEffect(() => {
    if (selectedPerson) {
      setName(selectedPerson.name);
      setEmail(selectedPerson.email);
      setPhone(selectedPerson.phone_number);
    }
  }, [selectedPerson]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPerson) return;

    try {
      const updatedPerson: Person = { id: selectedPerson.id, name, email, phone_number };
      await updatePerson(updatedPerson);

      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person.id === selectedPerson.id ? updatedPerson : person
        )
      );

      setSelectedPerson(null); 
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  if (!selectedPerson) return null; 

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Person</h2>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone: </label>
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Person</button>
      <button type="button" onClick={() => setSelectedPerson(null)}>
        Cancel
      </button>
    </form>
  );
};

export default UpdatePersonForm;
