import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.note.name}</h6>
          <p className="card-text">{props.note.description}</p>
          <i
            className="fa-sharp fa-solid fa-trash"
            onClick={() => {
              deletenote(note._id);
              props.showAlert("Note Deleted Sucessfully","success");
            }}
          ></i>
          <i
            className="fa-sharp fa-solid fa-edit mx-3"
            onClick={() => {
              updatenote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
