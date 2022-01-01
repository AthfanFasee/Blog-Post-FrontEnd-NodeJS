import { useContext } from "react"
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider"

function UpdateButton({post}) {
  const {setNewTitle, setNewPostText, isEditsection, setId} = useContext(HomePageContext)
    return (
        <div>
            <button 
                title="Update"
                onClick={() => { 
                setId(post.id)                           //I need the id of the specific post the edit button is clicked later to use on updateDoc function. And I can't access the id outside of mapping, so setting it up on a state right here when I click the edit button
                isEditsection(true)
                setNewTitle(post.title)
                setNewPostText(post.postText)  
              }}>&#128394;</button>
        </div>
    )
}

export default UpdateButton
