import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "Duplicate Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  fireEvent.change(inputTask, { target: { value: "Duplicate Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const tasks = screen.getAllByText(/Duplicate Test/i);
  expect(tasks.length).toBe(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const task = screen.queryByTestId('todo-test');
  expect(task).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "Null Date Test" } });
  fireEvent.click(button);

  const task = screen.queryByText(/Null Date Test/i);
  expect(task).not.toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "Checkbox Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const task = screen.queryByText(/Checkbox Test/i);
  expect(task).not.toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "Past Due Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const taskCard = screen.getByTestId(/Past Due Test/i).closest('.MuiPaper-root');
  expect(taskCard).toHaveStyle('background: red');

 });
