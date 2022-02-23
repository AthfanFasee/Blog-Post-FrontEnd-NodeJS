import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { HomePageProvider } from '../../../Helper/HomePageContexts/HomePageProvider';
import CommentInput from '../CommentInput';



describe('CommentInput', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<HomePageProvider><CommentInput /></HomePageProvider>);
    })

    describe('Input element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Comment.../i)).toBeInTheDocument();
        })
        it('should be empty initially', () => {
            expect(screen.getByPlaceholderText(/Comment.../i).value).toBe("");         
        })
        it('should be able to type', () => {
            const inputElement = screen.getByPlaceholderText(/Comment.../i);
            userEvent.type(inputElement, 'Comment');   
            expect(inputElement.value).toBe('Comment');    
        })
    })

})