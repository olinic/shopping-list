import React from 'react';
import AddItem from './AddItem';
import ListItem from './ListItem';

class List extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         items: []
      };
      this.addToStart = this.addToStart.bind(this);
      this.addToEnd = this.addToEnd.bind(this);
   }

   addToStart(value) {
      this.setState(state => ({
         items: [value].concat(state.items)
      }));
   }

   addToEnd(value) {
      this.setState(state => ({
         items: state.items.concat(value)
      }));
   }

   handleItemUpdate = (updatedItem) => {
      const items = this.state.items.map(item => {
         if (item.id === updatedItem.id) {
            return {
               ...item,
               text: updatedItem.text
            }
         } else {
            return item;
         }
      });
      this.setState({ items: items });
   }

   render() {
      const listItems = this.state.items.map((item) => 
         <ListItem key={item.id} value={item} onChange={this.handleItemUpdate}></ListItem>
      );
      return (
         <div>
            <AddItem onAdd={this.addToStart}></AddItem>
            <div>{listItems}</div>
            {this.state.items.length > 0 &&
               <AddItem onAdd={this.addToEnd}></AddItem>
            }
         </div>
      );
   }
}

export default List;