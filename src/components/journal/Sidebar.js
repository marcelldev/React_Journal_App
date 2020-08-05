
import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Sidebar = () => {

    const state = useSelector(state => state.auth);

    const {name} = state;
 
    const dispatch = useDispatch();

    const handleLogout=()=>{

      dispatch(startLogout());

    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__siderbar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>  {name}</span>
                </h3>

                <button 
                    className="btn"
                    onClick={handleLogout}
                    >
                    Logout

                </button>

            </div>

            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>

            <JournalEntries/>

        </aside>
    )
}
