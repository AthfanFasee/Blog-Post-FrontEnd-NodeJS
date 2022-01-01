import UpdatePost from '../UpdatePost'
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
describe('Cancel Button', () => {
    it("Cancel Button should Render", () => {
        
        render(<HomePageProvider>
            <UpdatePost />
        </HomePageProvider>)
        const cancelButton = screen.getByRole("button", {name: /Cancel/i})
        expect(cancelButton).toBeInTheDocument()
    })

    it("Cancel Button should run isEditsection", () => {
        const isEditsection = jest.fn()
        render(<HomePageProvider value={{isEditsection}}>
            <UpdatePost />
        </HomePageProvider>)
        const cancelButton = screen.getByRole("button", {name: /Cancel/i})
        fireEvent.click(cancelButton)
        expect(isEditsection).toBeCalled()
    })
    

})


describe('Save Changes Button', () => {
    it("Save Changes Button should Render", () => {
       
        render(<HomePageProvider>
            <UpdatePost />
        </HomePageProvider>)
        const cancelButton = screen.getByRole("button", {name: /Save Changes/i})
        expect(cancelButton).toBeInTheDocument()
    })

    it("Save Changes Button should be Disabled by Default", () => {
        
        render(<HomePageProvider>
            <UpdatePost />
        </HomePageProvider>)
        const saveChangesButton = screen.getByRole("button", {name: /Save Changes/i})
        expect(saveChangesButton).toBeDisabled()
    })
})

describe('Inputs', () => {
    it("TitleInput is being Rendered", () => {

        render(<HomePageProvider>
            <UpdatePost />
        </HomePageProvider>)
        const TitleInput = screen.getByTitle(/Title/i)
        expect(TitleInput).toBeInTheDocument()
    })

    it("TextArea should Render", () => {
        render(<HomePageProvider>
            <UpdatePost />
        </HomePageProvider>)
        const TextArea = screen.getByTitle(/TextArea/i)
        expect(TextArea).toBeInTheDocument()
    })

    it("TitleInput should run setNewTitle with value", () => {
        const setNewTitle = jest.fn()
        render(<HomePageProvider value={{setNewTitle}}>
            <UpdatePost />
        </HomePageProvider>)
        const TitleInput = screen.getByTitle(/Title/i)
        fireEvent.change(TitleInput, { target: {value: "Testing"}})
        expect(setNewTitle).toBeCalledWith("Testing")
    })

    it("TextArea should run setNewPostText with value", () => {
        const setNewPostText = jest.fn()
        render(<HomePageProvider value={{setNewPostText}}>
            <UpdatePost />
        </HomePageProvider>)
        const TextArea = screen.getByTitle(/TextArea/i)
        fireEvent.change(TextArea, { target: {value: "Testing"}})
        expect(setNewPostText).toBeCalledWith("Testing")
    })

    
})
