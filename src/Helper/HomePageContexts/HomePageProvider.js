import { createContext, useState } from "react"


export const HomePageContext = createContext(null)

export function HomePageProvider({children}) {

    const [postLists, setPostLists] = useState([]);
    


    const [newtitle, setNewTitle] = useState("")
    const [newpostText, setNewPostText] = useState("")
    
    



    const [id, setId] = useState("")

    const[editsection, isEditsection] = useState(false);
    
    return (
        <HomePageContext.Provider value={{postLists, setPostLists, newtitle, setNewTitle, newpostText ,setNewPostText, id, setId, editsection, isEditsection}}>
            {children}
        </HomePageContext.Provider>
    )
}


