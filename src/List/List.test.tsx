import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as StorageService from '../Storage/StorageService';
import { describe, test, beforeEach, expect } from 'vitest';

import List from './List';

describe('List', () => {

   beforeEach(() => {
      cleanup();
      StorageService.clear();
   });

   test('renders List component', () => {
      render(<List />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
   });

   async function userAddItemToEnd(text: string) {
      const addItemToEnd = {name: "Add item to end"};
      await userEvent.click(screen.getByRole('textbox', addItemToEnd));
      await userEvent.keyboard(text);
      await userEvent.click(screen.getByRole('button', addItemToEnd));
   }

   async function userAddItem(text: string) {
      const addItem = {name: /add item to start/i};
      await userEvent.click(screen.getByRole('textbox', addItem));
      await userEvent.keyboard(text);
      await userEvent.click(screen.getByRole('button', addItem));
   }

   test('add List Item', async () => {
      const input = "silly text";
      render(<List />);
      await userAddItem(input);
      expect(screen.getByDisplayValue(input)).toBeInTheDocument();
   });

   function expectListItems(expectedList: string[]) {
      const actualItems = screen.getAllByRole('textbox', {name: /list item/i});
      expect(actualItems).toHaveLength(expectedList.length);
      for (let i = 0; i < expectedList.length; i++) {
         const expected = expectedList[i];
         expect(actualItems[i]).toHaveValue(expected);
      }
   }

   test('add List Item to start', async () => {
      render(<List />);
      await userAddItem("a");
      await userAddItem("z");
      expectListItems(["z", "a"]);
   });

   test('add List Item to end', async () => {
      render(<List />);
      await userAddItem("a");
      await userAddItemToEnd("z");
      expectListItems(["a", "z"]);
   });

   test('remove List Item', async () => {
      render(<List />);
      const input = "silly text";
      await userAddItem(input);
      await userEvent.click(screen.getByRole('button', {name: /delete item/i}));
      expect(screen.queryByDisplayValue(input)).toBeNull();
   });

   test('edit List Item', async () => {
      render(<List />);
      await userAddItem("silly");
      await userEvent.click(screen.getByRole('textbox', {name: /list item/i}));
      await userEvent.keyboard("s");
      expect(screen.getByDisplayValue("sillys")).toBeInTheDocument();
   });

   test('complete List Item', async () => {
      render(<List />);
      const input = "silly text";
      await userAddItem(input);
      await userCompleteItem();
      const element = screen.getByDisplayValue(input)
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("text-st");
   });

   async function userCompleteItem() {
      await userEvent.click(screen.getByRole('button', {name: /complete list item/i}));
   }

   test('completed List Item shows in Checked Off section by default', async () => {
      render(<List />);
      const input = "silly text";
      await userAddItem(input);
      await userCompleteItem();
      expect(screen.getByText("Checked Off")).toBeInTheDocument();
   });

   test('completed List Item are in alphabetical order in Checked Off section', async () => {
      render(<List />);
      await userAddItems(["b", "c", "a"]);
      await userCompleteAllItems();
      expectListItems(["a", "b", "c"]);
   });

   async function userCompleteAllItems() {
      const elements = screen.getAllByRole('button', {name: /complete list item/i})
      for (let element of elements) {
         await userEvent.click(element);
      }
   }

   test('completed List Item shows in List section when sort view is enabled', async () => {
      render(<List />);
      const input = "silly text";
      await enableSortView();
      await userAddItem(input);
      await userCompleteItem();
      expect(screen.queryByText("Checked Off")).toBeNull();
   });

   async function enableSortView() {
      await userEvent.click(screen.getByRole('checkbox', {name: /sort view/i}));
   }

   async function userAddItems(list: string[]) {
      const reversed = list.slice().reverse();
      for (const item of reversed) {
         await userAddItem(item);
      }
   }

   test('move buttons not present in default view', () => {
      expect(screen.queryAllByRole('button', {name: /move item/i}).length).toBe(0);
   });

   test('move List Item down', async () => {
      render(<List />);
      await userAddItems(["a", "b", "c"]);
      await enableSortView();
      await moveItemDown(0);
      expectListItems(["b", "a", "c"]);
   });

   async function moveItemDown(idx: number) {
      const moveUpBtns = screen.getAllByRole('button', {name: /move item down/i});
      await userEvent.click(moveUpBtns[idx]);
   }

   async function moveItemUp(idx: number) {
      const moveUpBtns = screen.getAllByRole('button', {name: /move item up/i});
      await userEvent.click(moveUpBtns[idx]);
   }

   test('move List Item up', async () => {
      render(<List />);
      await userAddItems(["a", "b", "c"]);
      await enableSortView();
      await moveItemUp(1);
      expectListItems(["b", "a", "c"]);
   });
});