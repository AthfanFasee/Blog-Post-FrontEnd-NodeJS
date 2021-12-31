import { createContext, useState } from "react"


export const HomePageContext = createContext(null)

function HomePageProvider({children}) {

    const [postLists, setPostLists] = useState([]);
    


    const [newtitle, setTitle] = useState("")
    const [newpostText, setPostText] = useState("")



    const [id, setId] = useState("")

    const[editsection, isEditsection] = useState(false);
    
    return (
        <HomePageContext.Provider value={{postLists, setPostLists, newtitle, setTitle, newpostText ,setPostText, id, setId, editsection, isEditsection}}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageProvider
