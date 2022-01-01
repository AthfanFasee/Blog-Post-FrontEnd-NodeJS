import UpdateButton from '../UpdateButton'
import '@testing-library/jest-dom'
import {  fireEvent, render, screen} from '@testing-library/react'
import { HomePageProvider } from '../../../Helper/HomePageContexts/HomePageProvider'


//Creating mock fuction to test ContextApi
jest.mock('../../../Helper/HomePageContexts/HomePageProvider.js', () => {
    const React2 = require('react')
    const fakeHomePageContext = React2.createContext({})

    const FakeHomePageProvider = ( {children, value={}}) => {
        return (
            <fakeHomePageContext.Provider value={value}>
                {children}
            </fakeHomePageContext.Provider>
        )
    }
    return {
        HomePageContext: fakeHomePageContext,
        HomePageProvider: FakeHomePageProvider
    }
})

//Actual Test Begins Here
describe('Update Button', () => {
    it("Update Button should Render", () => {
        render(<HomePageProvider>
            <UpdateButton />
        </HomePageProvider>)
        const Button = screen.getByTitle(/Update/i)
        expect(Button).toBeInTheDocument()
    })
    
    it("Update Button should run setId, isEditsection, setNewTitle, setNewPostText", () => {
        const isEditsection = jest.fn()
        const setId = jest.fn()
        const setNewTitle = jest.fn()
        const setNewPostText = jest.fn()
        
        render(<HomePageProvider value={{isEditsection, setId, setNewTitle, setNewPostText}}>            
            <UpdateButton post={""}/>
        </HomePageProvider>)
        const updateButton = screen.getByTitle(/Update/i)
        fireEvent.click(updateButton)
        expect(isEditsection).toBeCalled()
        expect(setId).toBeCalled()
        expect(setNewTitle).toBeCalled()
        expect(setNewPostText).toBeCalled()
        
    })
})
