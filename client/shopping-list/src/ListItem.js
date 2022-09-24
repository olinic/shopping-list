import React from 'react';
import { throttle } from 'lodash';

class ListItem extends React.Component {

   constructor(props) {
      super(props);
      this.draggable = React.createRef();
      this.dragHandle = React.createRef();
      this.throttledHandleDragOver = throttle(this.handleDragOver, 500);
   }

   handleMouseDown = (e) => {
      this.target = e.target;
   }

   handleDragStart = (e) => {
      if (this.dragHandle.current.contains(this.target)) {
         if (this.props.onDrag) {
            this.props.onDrag(this.props.value);
         }
      } else {
         e.preventDefault();
      }
   }

   handleDragOver = (e) => {
      if (this.props.onMove) {
         this.props.onMove(this.props.value);
      }
   }

   toggleCompletion = (e) => {
      if (this.props.onChange) {
         this.props.onChange( {
            ...this.props.value,
            isComplete: !this.props.value.isComplete
         });
      }
   };

   handleChange = (e) => {
      if (this.props.onChange) {
         this.props.onChange({
            ...this.props.value,
            text: e.target.value
         });
      }
   };

   handleSubmit = (e) => {
      e.preventDefault();
      if (this.props.onReturn) {
         this.props.onReturn();
      }
   };

   handleDelete = () => {
      if (this.props.onDelete) {
         this.props.onDelete(this.props.value);
      }
   };

   render() {
      let checkbox = (
         <button className="btn btn-link"
               aria-label="Complete list item"
               onClick={this.toggleCompletion}>
            <i className={this.props.value.isComplete ? "fa-regular fa-circle-check" : "fa-regular fa-circle"}></i>
         </button>
      );
      let inputGroup = (
         <div className="input-group">
            <div className="bg-dark border-0 input-group-text">
               {checkbox}
            </div>
            <input className={"form-control bg-dark border-0 text-light" + (this.props.value.isComplete ? " text-st" : "")}
               aria-label="List item"
               onChange={this.handleChange}
               value={this.props.value.text}/>
            <div className="bg-dark border-0 input-group-text">
               <button className="btn btn-sm btn-dark border-danger text-danger" type="button" 
                     onClick={this.handleDelete} aria-label="Delete item">
                  <i className="fa-solid fa-trash"></i>
               </button>
            </div>
            <div className="text-secondary bg-dark border-0 input-group-text"
                  aria-label="Drag list item"
                  ref={this.dragHandle}>
               <i className="fa-solid fa-up-down"
                     title="Move item"></i>
            </div>
         </div>
      );
      return (
         <form draggable="true" ref={this.draggable}
               onSubmit={this.handleSubmit}
               onMouseDown={this.handleMouseDown}
               onDragStart={this.handleDragStart}
               onDragOver={this.throttledHandleDragOver}>
            {inputGroup}
         </form>
      );
   }
}

export default ListItem;