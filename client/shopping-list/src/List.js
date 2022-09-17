import React from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';

class List extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         items: [],
         isCombinedView: false
      };
   }

   toggleViewMode = () => {
      this.setState({
         isCombinedView: !this.state.isCombinedView
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

   handleItemDelete = (deletedItem) => {
      const items = this.state.items.filter(item => {
         return (item.id !== deletedItem.id);
      });
      this.setState({ items: items });
   }

   renderListItem(item) {
      return (
            <ListItem key={item.id} value={item}
                  onChange={this.handleItemUpdate}
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
      if (this.state.isCombinedView) {
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
               <input type="checkbox" class="btn-check" id="btn-check-outlined"
                     checked={this.state.isCombinedView} autocomplete="off"
                     onChange={this.toggleViewMode}/>
               <label class="btn btn-outline-light" for="btn-check-outlined">Combined View</label>
            </div>
            <AddItem onAdd={this.addToStart}></AddItem>
            <div>{mainList}</div>
            {mainList.length > 0 &&
               <AddItem onAdd={this.addToEnd}></AddItem>
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