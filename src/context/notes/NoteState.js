import { useState } from "react";
import noteContext from "./noteContext";

const NoteSate = (props) => {
  const host = "https://notesonthecloud-1.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  const editnote = async (id, title, description, tag) => {
    // console.log("hi")
    // console.log(title)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    //setNotes(notes.f);

    let newnote = [];

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        newnote.push(element);
      } else {
        newnote.push(element);
      }
    }
    setNotes(newnote);
  };
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    getnotes();
  };
  return (
    <noteContext.Provider
      value={{ notes, addnote, editnote, deletenote, getnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteSate;
