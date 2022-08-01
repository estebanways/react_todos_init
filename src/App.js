import React, { useState } from "react";
import "./App.css";

function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  // Helper Functions

  /* Adds a new item to the list array*/
  function addItem() {
    // ! Check for empty item
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {
    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main part of app
  return (
    <div className="app">
      <div className="todos">
        {/* 1. Header  */}
        <h1>Todo List</h1>

        {/* 2. Add new item (input) */}
        <input
          type="text"
          placeholder="Add an item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        {/* Add (button) */}
        <button className="button-blue" onClick={() => addItem()}>Add</button>

        {/* 3. List of todos (unordered list) */}
        <ul>
          {items.map((item) => {
            return (
              <article>
                <li key={item.id} onClick={() => setShowEdit(item.id)}>
                  {item.value} &nbsp;
                  <button
                    className="button-blue"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </li>

                {showEdit == item.id ? (
                  <div>
                    <input
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <button
                      className="button-blue" 
                      onClick={() => editItem(item.id, updatedText)}>
                      Update
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;