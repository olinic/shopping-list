import { Component } from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';
import Item from './Item';
import { getItem, setItem } from '../Storage/StorageService';

interface ListProps {}
interface ListState {
    items: Item[];
    isSortView: boolean;
}

class List extends Component<ListProps, ListState> {

   constructor(props: ListProps) {
      super(props);
      this.state = {
         items: [],
         isSortView: false
      };
   }

   componentDidMount() {
      this.loadState();
   }

   componentDidUpdate() {
      this.saveState();
   }

   loadState() {
      getItem("state").then(value => {
         if (value === null) {
            value = {
               items: [],
               isSortView: false
            };
            setItem("state", value);
         }
         this.setState(value);
      });
   }

   saveState() {
      setItem("state", this.state);
   }

   toggleViewMode = () => {
      this.setState({
         isSortView: !this.state.isSortView
      });
   };

   addToStart = (value: Item) => {
      this.setState(state => ({
         items: [value].concat(state.items)
      }));
   }

   addToEnd = (value: Item) => {
      this.setState(state => ({
         items: state.items.concat(value)
      }));
   }

   handleItemUpdate = (updatedItem: Item) => {
      const items = this.state.items.map(item => {
         if (item.id === updatedItem.id) {
            return updatedItem;
         } else {
            return item;
         }
      });
      this.setState({ items: items });
   }

   handleItemMoveUp = (itemToMove: Item) => {
      this.handleItemMove(itemToMove, (idx) => idx - 1);
   }

   handleItemMoveDown = (itemToMove: Item) => {
      this.handleItemMove(itemToMove, (idx) => idx + 1);
   }

   handleItemMove(itemToMove: Item, idxFn: (arg: number) => number) {
      let movedItems = this.state.items.slice();
      let selectedIdx = movedItems.indexOf(itemToMove);
      let targetIdx = idxFn(selectedIdx);
      if ((targetIdx >= 0) && (targetIdx < movedItems.length)) {
         movedItems.splice(selectedIdx, 1);
         movedItems.splice(targetIdx, 0, itemToMove);
         this.setState({
            items: movedItems
         });
      }
   }

   handleItemDelete = (deletedItem: Item) => {
      const items = this.state.items.filter(item => {
         return (item.id !== deletedItem.id);
      });
      this.setState({ items: items });
   }

   renderListItem(item: Item) {
      return (
            <ListItem key={item.id} value={item}
                  isSortView={this.state.isSortView}
                  onChange={this.handleItemUpdate}
                  onMoveUp={this.handleItemMoveUp}
                  onMoveDown={this.handleItemMoveDown}
                  onDelete={this.handleItemDelete}>
            </ListItem>
      );
   }

   textSort(a: Item, b: Item) {
      const textA = a.text.toUpperCase();
      const textB = b.text.toUpperCase();
      if (textA > textB) {
         return 1;
      } else if (textA < textB) {
         return -1;
      } else {
         return 0
      }
   }

   render() {
      let mainList;
      let checkedList: any[] = [];
      if (this.state.isSortView) {
         mainList = this.state.items.map(item => this.renderListItem(item));
      } else {
         mainList = this.state.items.filter(item => !item.isComplete).map(item => this.renderListItem(item));
         checkedList = this.state.items
               .filter(item => item.isComplete)
               .sort(this.textSort)
               .map(item => this.renderListItem(item));
      }
      return (
         <div>
            <div className="text-end">
               <input type="checkbox" className="btn-check" id="btn-check-outlined"
                     checked={this.state.isSortView} autoComplete="off"
                     onChange={this.toggleViewMode}/>
               <label className="btn btn-outline-light" htmlFor="btn-check-outlined">Sort View</label>
            </div>
            <AddItem label="Add item to start" placeholder="Item to beginning" onAdd={this.addToStart}></AddItem>
            <div>{mainList}</div>
            {mainList.length > 0 &&
               <AddItem label="Add item to end" placeholder="Item to end" onAdd={this.addToEnd}></AddItem>
            }
            {(checkedList.length > 0) &&
               <div>
                  <br/>
                  <hr/>
                  <h2 className="text-secondary">Checked Off</h2>
               </div>
            }
            {checkedList}
         </div>
      );
   }
}

export default List;