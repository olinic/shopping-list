import { Component, ChangeEvent, FormEvent } from 'react';
import { ItemEventHandler } from './Item.tsx';

interface AddItemProps {
    label: string;
    placeholder: string
    onAdd?: ItemEventHandler;
};

interface AddItemState {
    text: string;
};

class AddItem extends Component<AddItemProps, AddItemState> {

   constructor(props: AddItemProps) {
      super(props);
      this.state = {
         text: ''
      };
   }

   handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ 
         text: event.target.value
      });
   };

   handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const value = this.state.text;
      if (value.length > 0) {
         if (this.props.onAdd) {
            this.props.onAdd({
               id: Date.now(),
               text: this.state.text,
               isComplete: false
            });
         }
         this.setState({
            text: ''
         });
      }
   };

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3 mt-3">
               <button aria-label={this.props.label} type="submit" className="btn btn-outline-secondary bg-primary text-light">
                  <i className="fa-plus fa-xl"></i> 
               </button>
               <input type="text" className="form-control bg-dark text-light border-primary" 
                     onChange={this.handleChange}
                     value={this.state.text}
                     placeholder={this.props.placeholder} aria-label={this.props.label}/>
            </div>
         </form>
      );
   }
}

export default AddItem;