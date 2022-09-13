import React from 'react';

class List extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         items: []
      };
   }

   getAddBtn() {
      return (
         <button class="btn bg-primary text-light">Add</button>
      );
   }

   getItems() {
      const listItems = this.state.items.map((value, index) => 
         <li key={index}>{value}</li>
      );
      return (
         <ul>{listItems}</ul>
      );
   }

   render() {
      return [
         this.getAddBtn(),
         this.getItems()
      ];
   }
}

export default List;