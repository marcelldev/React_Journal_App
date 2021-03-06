import React, { useEffect, useRef } from 'react';
import { NotesAppbar } from './NotesAppbar';
import { useSelector, useDispatch } from 'react-redux';
import {useForm}  from '../../hooks/useForm';
import { activeNote, StartDeleting } from '../../actions/notes';
 
export const NotesScreen = () => {

    const dispatch = useDispatch();
    
    const {active:note} = useSelector(state => state.notes)
     
    const [formValues,handleInputChange,reset] = useForm(note);

    const {body,title,id} = formValues;

    const activeId = useRef(note.id);//refesca solo esa parte


    useEffect(() => {
        
        if (note.id !== activeId.current) {
            reset(note)

            activeId.current=note.id
        }
    }, [note ,reset])

    useEffect(() => {
        
        dispatch(activeNote(formValues.id,{...formValues}));

    }, [formValues,dispatch])

    
    //console.log(formValues); 
    //console.log(note);

    const handleDelete=()=>{

        dispatch(StartDeleting(id));

    }

    return (
        <div className="notes__main-content">
            <NotesAppbar/>

            <div className="notes__content">

                <input 
                      type="text"
                      placeholder="some awesome title"
                      className="notes__title-input"
                      autoComplete="off"
                      name="title"
                      value={title}
                      onChange={handleInputChange}

                      />
                <textarea
                     placeholder="wath happened today"
                     className="notes__textarea"
                     name="body"
                     value={body}
                     onChange={handleInputChange}
                >

                </textarea>

                    {
                    (note.url)
                    &&
                     
                    (
                        <div className="notes__image">
                            <img
                            src={note.url}
                            alt="image"
                        />
                        </div>
                     )
                     
                    }

               
            </div>
            
            <button 
               className="btn btn-danger"
               onClick={handleDelete}
               > 

               Delete

            </button>
            
            
        </div>
    )
}
