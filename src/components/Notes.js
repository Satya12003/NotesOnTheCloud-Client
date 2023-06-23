import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { getnotes, notes ,editnote} = context;
  const [note, setNote] = useState({ id : "" ,title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    //console.log(note)
    editnote(note._id,note.title, note.description, note.tag)
    props.showAlert("Note Updated Successfully","success")
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const ref = useRef(null)
  const updatenote = (currnote) => {
    ref.current.click()
    setNote(currnote)
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    }
    else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              value = {note.title}
              minLength = {5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              aria-describedby="emailHelp"
              onChange={onchange}
              value = {note.description}
              minLength = {5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              onChange={onchange}
              value = {note.tag}
            />
          </div>
        </form>
      </div>
            </div>
            <div className="modal-footer">
              <button disabled = {note.title.length < 5 || note.description.length < 5 } type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h1>All Notes</h1>
      <div className="row my-3">
        <div className="container">
        {notes.length === 0 && "NO NOTES AVAILABLE"}
        </div>
        {notes.map((note) => {
          return < NoteItem key={note._id} note={note} showAlert={props.showAlert} updatenote={updatenote} />
        })}
      </div>
    </>
  )
}

export default Notes
