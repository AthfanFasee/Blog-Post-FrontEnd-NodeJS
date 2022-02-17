import { createContext, useState } from "react";


export const HomePageContext = createContext(null)

export function HomePageProvider({children}) {

    //For all the posts in HomePage
    const [postLists, setPostLists] = useState([]);
    

    //To save data while updating
    const [newtitle, setNewTitle] = useState("");
    const [newpostText, setNewPostText] = useState("");
    
    
    //To save noOfPages
   const [pageCount, setPageCount] = useState(1);

  //To save updatedPost
   const [updatedPost, setUpdatedPost] = useState("");

  //to save sort value
   const [sort, setSort] = useState('-createdAt');



    const [id, setId] = useState("");

   //Saving current User's ID to get only his posts if needed
    const [ID, setID] = useState("");

    const [editsection, isEditsection] = useState(false);

    //For Pagination
    const [page, setPage] = useState(1);


    
    
    return (
        <HomePageContext.Provider value={{sort, setSort, setUpdatedPost, updatedPost, pageCount, setPageCount, setID, ID, postLists, setPostLists, newtitle, setNewTitle, newpostText ,setNewPostText, id, setId, editsection, isEditsection, page, setPage}}>
            {children}
        </HomePageContext.Provider>
    )
}


