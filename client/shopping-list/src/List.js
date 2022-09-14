import React from 'react';
import AddItem from './AddItem';

class List extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         items: []
      };
      this.addItem = this.addItem.bind(this);
   }

   addItem(value) {
      this.setState(state => ({
         items: state.items.concat(value)
      }));
   }

   render() {
      const listItems = this.state.items.map((value, index) => 
         <li key={index}>{value}</li>
      );
      return (
         <div>
            <AddItem onAdd={this.addItem}></AddItem>
            <ul>{listItems}</ul>
         </div>
      );
   }
}

export default List;