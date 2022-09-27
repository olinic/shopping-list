import React from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';

class List extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         items: [],
         isSortView: false
      };
   }

   toggleViewMode = () => {
      this.setState({
         isSortView: !this.state.isSortView
      });
   };

   addToStart = (value) => {
      this.setState(state => ({
         items: [value].concat(state.items)
      }));
   }

   addToEnd = (value) => {
      this.setState(state => ({
         items: state.items.concat(value)
      }));
   }

   handleItemUpdate = (updatedItem) => {
      const items = this.state.items.map(item => {
         if (item.id === updatedItem.id) {
            return updatedItem;
         } else {
            return item;
         }
      });
      this.setState({ items: items });
   }

   handleItemMoveUp = (itemToMove) => {
      this.handleItemMove(itemToMove, (idx) => idx - 1);
   }

   handleItemMoveDown = (itemToMove) => {
      this.handleItemMove(itemToMove, (idx) => idx + 1);
   }

   handleItemMove(itemToMove, idxFn) {
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

   handleItemDelete = (deletedItem) => {
      const items = this.state.items.filter(item => {
         return (item.id !== deletedItem.id);
      });
      this.setState({ items: items });
   }

   renderListItem(item) {
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

   textSort(a, b) {
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
      let checkedList = [];
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
            <AddItem label="Add item to start" onAdd={this.addToStart}></AddItem>
            <div>{mainList}</div>
            {mainList.length > 0 &&
               <AddItem label="Add item to end" onAdd={this.addToEnd}></AddItem>
            }
            {(checkedList.length > 0) &&
               <div>
                  <br/>
                  <hr/>
                  <h2 className="text-secondary">Checked Items</h2>
               </div>
            }
            {checkedList}
         </div>
      );
   }
}

export default List;