import { Combobox } from "@headlessui/react";
import console from "console";
import { useEffect, useState } from "react";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

export const AutoCompleteSelect = (authToken: string) => {
  const [options, setOptions] = useState();
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    async function load() {
      const response = await fetch(
        "https://api.dev.zusapi.com/forms-data/terminology/conditions?display=b",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await response.json();
      // setOptions(data);
      console.log("data", data);
    }
    load();
  });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
