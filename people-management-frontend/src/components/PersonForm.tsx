
import React, { useState } from "react";
import { createPerson } from "../services/api";

interface Person {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface PersonFormProps {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

const PersonForm: React.FC<PersonFormProps> = ({ setPeople }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhone] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPerson = { name, email, phone_number };
      const { id }: { id: number } = await createPerson(newPerson); 

      setPeople((prevPeople) => [...prevPeople, { ...newPerson, id }]);

      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error creating person:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Person</h2>
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
      <button type="submit">Create Person</button>
    </form>
  );
};

export default PersonForm;
