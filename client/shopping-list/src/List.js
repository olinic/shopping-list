import React from 'react';
import AddItem from './AddItem';

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

   render() {
      const listItems = this.state.items.map((value, index) => 
         <div className="input-group" key={index}>
            <div className="bg-dark border-secondary input-group-text">
               <input className="bg-dark border-primary form-check-input mt-0" type="checkbox" value=""
                     aria-label="Checkbox for list item." disabled/>
            </div>
            <input className="form-control bg-dark border-secondary text-light" value={value}/>
         </div>
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