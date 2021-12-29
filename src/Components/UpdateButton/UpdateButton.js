import { useContext } from "react"
import {AppContext} from '../../pages/HomePage/HomePage'


function UpdateButton({post}) {
    const {setId, setTitle, setPostText, isEditsection} = useContext(AppContext)
    return (
        <div>
            <button 
              onClick={() => { 
                setId(post.id)                           //I need the id of the specific post the edit button is clicked later to use on updateDoc function. And I can't access the id outside of mapping, so setting it up on a state right here when I click the edit button
                isEditsection(true)
                setTitle(post.title)
                setPostText(post.postText)  
              }}>&#128394;</button>
        </div>
    )
}

export default UpdateButton
