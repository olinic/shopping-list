import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import List from './List';

describe('List', () => {
   test('renders List component', () => {
      render(<List />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
   });

   test('add List Item', () => {
      render(<List />);
      const input = "silly text";
      userAddItem(input);
      expect(screen.getByDisplayValue(input)).toBeInTheDocument();
   });

   test('add List Item to start', () => {
      render(<List />);
      userAddItem("a");
      userAddItem("z");
      expectListItems(["z", "a"]);
   });

   test('add List Item to end', () => {
      render(<List />);
      userAddItem("a");
      userAddItemToEnd("z");
      expectListItems(["a", "z"]);
   });

   function userAddItemToEnd(text) {
      const addItemToEnd = {name: "Add item to end"};
      userEvent.click(screen.getByRole('textbox', addItemToEnd));
      userEvent.keyboard(text);
      userEvent.click(screen.getByRole('button', addItemToEnd));
   }

   function userAddItem(text) {
      const addItem = {name: /add item to start/i};
      userEvent.click(screen.getByRole('textbox', addItem));
      userEvent.keyboard(text);
      userEvent.click(screen.getByRole('button', addItem));
   }

   test('remove List Item', () => {
      render(<List />);
      const input = "silly text";
      userAddItem(input);
      userEvent.click(screen.getByRole('button', {name: /delete item/i}));
      expect(screen.queryByDisplayValue(input)).toBeNull();
   });

   test('edit List Item', () => {
      render(<List />);
      userAddItem("silly");
      userEvent.click(screen.getByRole('textbox', {name: /list item/i}));
      userEvent.keyboard("s");
      expect(screen.getByDisplayValue("sillys")).toBeInTheDocument();
   });

   test('complete List Item', () => {
      render(<List />);
      const input = "silly text";
      userAddItem(input);
      userCompleteItem();
      const element = screen.getByDisplayValue(input)
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("text-st");
   });

   function userCompleteItem() {
      userEvent.click(screen.getByRole('button', {name: /complete list item/i}));
   }

   test('completed List Item shows in Checked Items section by default', () => {
      render(<List />);
      const input = "silly text";
      userAddItem(input);
      userCompleteItem();
      expect(screen.getByText("Checked Items")).toBeInTheDocument();
   });

   test('completed List Item are in alphabetical order in Checked Items section', () => {
      render(<List />);
      userAddItems(["b", "c", "a"]);
      userCompleteAllItems();
      expectListItems(["a", "b", "c"]);
   });

   function expectListItems(expectedList) {
      const actualItems = screen.getAllByRole('textbox', {name: /list item/i});
      expect(actualItems).toHaveLength(expectedList.length);
      for (let i = 0; i < expectedList.length; i++) {
         const expected = expectedList[i];
         expect(actualItems[i]).toHaveValue(expected);
      }
   }

   function userCompleteAllItems() {
      const elements = screen.getAllByRole('button', {name: /complete list item/i})
      elements.forEach(element => userEvent.click(element));
   }

   test('completed List Item shows in List section when sort view is enabled', () => {
      render(<List />);
      const input = "silly text";
      enableSortView();
      userAddItem(input);
      userCompleteItem();
      expect(screen.queryByText("Checked Items")).toBeNull();
   });

   function enableSortView() {
      userEvent.click(screen.getByRole('checkbox', {name: /sort view/i}));
   }

   test('move buttons not present in default view', () => {
      expect(screen.queryAllByRole('button', {name: /move item/i}).length).toBe(0);
   });

   test('move List Item down', () => {
      render(<List />);
      userAddItems(["a", "b", "c"]);
      enableSortView();
      moveItemDown(0);
      expectListItems(["b", "a", "c"]);
   });

   function moveItemDown(idx) {
      const moveUpBtns = screen.getAllByRole('button', {name: /move item down/i});
      userEvent.click(moveUpBtns[idx]);
   }

   function moveItemUp(idx) {
      const moveUpBtns = screen.getAllByRole('button', {name: /move item up/i});
      userEvent.click(moveUpBtns[idx]);
   }

   function userAddItems(list) {
      const reversed = list.slice().reverse();
      for (const item of reversed) {
         userAddItem(item);
      }
   }

   test('move List Item up', () => {
      render(<List />);
      userAddItems(["a", "b", "c"]);
      enableSortView();
      moveItemUp(1);
      expectListItems(["b", "a", "c"]);
   });
});