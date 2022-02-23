import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DeleteButton from '../DeleteButton';

const mockedFunction= jest.fn();
const post = {_id : 1}
describe('Comments', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<DeleteButton deletePost={mockedFunction} post={post}/>);
    })


    describe('deleteIcon(Button)', () => {
        it('should render', () => {
            expect(screen.getByTestId(/deleteIcon/i)).toBeInTheDocument();
        })
        
    })

    describe('deleteDialog', () => {
        it('should not render before clicking deleteIcon', () => {
            expect(screen.queryByText(/Note That Once Deleted, This Post cannot be RESTORED!!!/i)).not.toBeInTheDocument();
        })
        it('should render after clicking deleteIcon', () => {
            userEvent.click(screen.getByTestId(/deleteIcon/i));
            expect(screen.getByText(/Note That Once Deleted, This Post cannot be RESTORED!!!/i)).toBeInTheDocument();
        })

        describe('Confirm Button', () => {
            it('should render after clicking deleteIcon', () => {
                userEvent.click(screen.getByTestId(/deleteIcon/i));
                expect(screen.getByRole('button', {name: /Confirm/i})).toBeInTheDocument();
            })
            it('should run deletePost function onClick', () => {
                userEvent.click(screen.getByTestId(/deleteIcon/i));
                userEvent.click(screen.getByRole('button', {name: /Confirm/i}));
                expect(mockedFunction).toBeCalled();
            })

        })

        describe('Close Button', () => {
            it('should render after clicking deleteIcon', () => {
                userEvent.click(screen.getByTestId(/deleteIcon/i));
                expect(screen.getByRole('button', {name: /Close/i})).toBeInTheDocument();
            })
            
            it('should not run deletePost function onClick', () => {
                userEvent.click(screen.getByTestId(/deleteIcon/i));
                userEvent.click(screen.getByRole('button', {name: /Close/i}));
                expect(mockedFunction).toBeCalledTimes(0);
            })
        })

    })
})