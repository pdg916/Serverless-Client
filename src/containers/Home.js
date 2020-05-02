import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {	
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
	async function onLoad() {
	  if (!isAuthenticated) {
		return;
	  }
  
	  try {
		const notes = await loadNotes();
		setNotes(notes);
	  } catch (e) {
		onError(e);
	  }
  
	  setIsLoading(false);
	}
  
	onLoad();
  }, [isAuthenticated]);
  
  function loadNotes() {
	return API.get("notes", "/notes");
  }
  function renderNotesList(notes) {
	return [{}].concat(notes).map((note, i) =>
	  i !== 0 ? (
		<LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
		  <ListGroupItem header={note.content.trim().split("\n")[0]}>
			{"Created: " + new Date(note.createdAt).toLocaleString()}
		  </ListGroupItem>
		</LinkContainer>
	  ) : (
		<LinkContainer key="new" to="/notes/new">
		  <ListGroupItem>
			<h4>
			  <b>{"\uFF0B"}</b> 생각 저장하기
			</h4>
		  </ListGroupItem>
		</LinkContainer>
	  )
	);
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>비싼노트</h1>
        <p id="c1">생각은 부자를 만듭니다. 비싼노트
        </p></div>
      
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>그동안의 생각들.</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}