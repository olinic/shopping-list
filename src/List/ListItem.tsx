import { Component, Fragment, ChangeEvent, FormEvent } from 'react';
import Item, { ItemEventHandler } from './Item.tsx';



interface ListItemProps {
    value: Item;
    isSortView: boolean;
    onChange?: ItemEventHandler;
    onDelete?: ItemEventHandler;
    onMoveUp?: ItemEventHandler;
    onMoveDown?: ItemEventHandler;
}

class ListItem extends Component<ListItemProps> {

   toggleCompletion = () => {
      if (this.props.onChange) {
         this.props.onChange({
            ...this.props.value,
            isComplete: !this.props.value.isComplete
         });
      }
   };

   handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (this.props.onChange) {
         this.props.onChange({
            ...this.props.value,
            text: event.target.value
         });
      }
   };

   handleSubmit = (event: FormEvent) => {
      event.preventDefault();
   };

   handleDelete = () => {
      if (this.props.onDelete) {
         this.props.onDelete(this.props.value);
      }
   };

   handleMoveUp = () => {
      if (this.props.onMoveUp) {
         this.props.onMoveUp(this.props.value);
      }
   }

   handleMoveDown = () => {
      if (this.props.onMoveDown) {
         this.props.onMoveDown(this.props.value);
      }
   }

   getAddonButtons() {
      if (this.props.isSortView) {
         return (
            <Fragment>
               <div className="bg-dark border-0 input-group-text">
                  <button className="btn btn-sm btn-dark text-light" type="button" 
                        onClick={this.handleMoveUp} aria-label="Move item up">
                     <i className="fa-solid fa-arrow-up"></i>
                  </button>
               </div>
               <div className="bg-dark border-0 input-group-text">
                  <button className="btn btn-sm btn-dark text-light" type="button" 
                        onClick={this.handleMoveDown} aria-label="Move item down">
                     <i className="fa-solid fa-arrow-down"></i>
                  </button>
               </div>
            </Fragment>
         );
      } else {
         return (
            <div className="bg-dark border-0 input-group-text">
               <button className="btn btn-sm btn-dark border-danger text-danger" type="button" 
                     onClick={this.handleDelete} aria-label="Delete item">
                  <i className="fa-solid fa-trash"></i>
               </button>
            </div>
         );
      }
   }

   render() {
      let inputGroup = (
         <div className="input-group">
            <div className="bg-dark border-0 input-group-text">
               <button className="btn btn-link"
                     aria-label="Complete list item"
                     onClick={this.toggleCompletion}>
                  <i className={this.props.value.isComplete ? "text-success fa-regular fa-circle-check" : "fa-regular fa-circle"}></i>
               </button>
            </div>
            <input className={"form-control bg-dark border-0 text-light" + (this.props.value.isComplete ? " text-st" : "")}
               aria-label="List item"
               onChange={this.handleChange}
               value={this.props.value.text}/>
            {this.getAddonButtons()}
         </div>
      );
      return (
         <form onSubmit={this.handleSubmit}>
            {inputGroup}
         </form>
      );
   }
}

export default ListItem;