import { createContext, useState } from "react"


export const HomePageContext = createContext(null)

export function HomePageProvider({children}) {

    //For all the posts in HomePage
    const [postLists, setPostLists] = useState([]);
    


    const [newtitle, setNewTitle] = useState("")
    const [newpostText, setNewPostText] = useState("")
    
    



    const [id, setId] = useState("")


    const [editsection, isEditsection] = useState(false);

    //For Pagination
    const [page, setPage] = useState(1);
    
    return (
        <HomePageContext.Provider value={{postLists, setPostLists, newtitle, setNewTitle, newpostText ,setNewPostText, id, setId, editsection, isEditsection, page, setPage}}>
            {children}
        </HomePageContext.Provider>
    )
}


