import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransferList from './components/TransferList'; // Adjust the import based on your file structure

describe('TransferList Component', () => {
  const items = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
    { id: 4, label: 'Item 4' },
    { id: 5, label: 'Item 5' },
  ];

  test('renders both lists with correct items', () => {
    render(<TransferList items={items} />);

    // Check that all items are rendered in the available list
    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    // Check that the selected list is initially empty
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  test('selects an item and highlights it', () => {
    render(<TransferList items={items} />);

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    // Check that item1 is selected (highlighted)
    expect(item1).toHaveClass('selected');
  });

  test('transfers selected items to the selected list', () => {
    render(<TransferList items={items} />);

    const item1 = screen.getByText('Item 1');
    const item4 = screen.getByText('Item 4');
    const transferButton = screen.getByTestId('moveRightBtn');

    fireEvent.click(item1); // Select item1
    fireEvent.click(item4); // Select item2
    fireEvent.click(transferButton); // Transfer item1

    // Check that item1 and item4 are now in the selected list
    const selectedListBox = screen.getByText('Selected Items').parentNode;
    expect(selectedListBox).toHaveTextContent('Item 1');
    expect(selectedListBox).toHaveTextContent('Item 4');

    // Check that item1 and item4 are removed from the available list
    const availableListBox = screen.getByText('Available Items').parentNode;
    expect(availableListBox).not.toHaveTextContent('Item 1');
    expect(availableListBox).not.toHaveTextContent('Item 4');
  });

  test('disables transfer buttons when no items are selected', () => {
    render(<TransferList items={items} />);

    const transferButtonRight = screen.getByTestId('moveRightBtn');
    const transferButtonLeft = screen.getByTestId('moveLeftBtn');

    // Both buttons should be disabled initially
    expect(transferButtonRight).toBeDisabled();
    expect(transferButtonLeft).toBeDisabled();

    // Select an item to enable the right transfer button
    const item2 = screen.getByText('Item 2');
    fireEvent.click(item2);
    expect(transferButtonRight).not.toBeDisabled();

    // Transfer item to selected list
    fireEvent.click(transferButtonRight);
    expect(transferButtonRight).toBeDisabled(); // Should be disabled again
  });

  test('transfers items back to the available list', () => {
    render(<TransferList items={items} />);

    const item1 = screen.getByText('Item 1');
    const transferButtonRight = screen.getByTestId('moveRightBtn');
    const transferButtonLeft = screen.getByTestId('moveLeftBtn');

    // Transfer item1 to the selected list
    fireEvent.click(item1);
    fireEvent.click(transferButtonRight);

    // Now, transfer it back to the available list
    const selectedItem1 = screen.getByText('Item 1');
    const selectedItem5 = screen.getByText('Item 5');
    fireEvent.click(selectedItem1);
    fireEvent.click(selectedItem5);
    fireEvent.click(transferButtonLeft);

    // Check that item1 is back in the available list
    const availableListBox = screen.getByText('Available Items').parentNode;
    expect(availableListBox).toHaveTextContent('Item 1');
    expect(availableListBox).toHaveTextContent('Item 5');

    // Check that item1 is removed from the selected list
    const selectedListBox = screen.getByText('Selected Items').parentNode;
    expect(selectedListBox).not.toHaveTextContent('Item 1');
    expect(selectedListBox).not.toHaveTextContent('Item 5');
  });
});