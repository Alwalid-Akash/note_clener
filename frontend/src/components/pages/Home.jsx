import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

import {
  useNotes
}
  from "../context/NoteContext";



function Home() {


  const {
    notes,
    loading
  } = useNotes();



  if (loading)
    return <h2>Loading...</h2>




  return (

    <div>


      <h1>
        My Notes
      </h1>


      <NoteForm />


      {
        notes.map(
          (note) => (

            <NoteCard
              key={note._id}
              note={note}
            />

          )
        )

      }


    </div>

  )

}


export default Home;