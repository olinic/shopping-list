import React from 'react';

class ListItem extends React.Component {

   toggleCompletion = (e) => {
      if (this.props.onChange) {
         this.props.onChange( {
            ...this.props.value,
            isCompleted: !this.props.value.isCompleted
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
         <button className="btn btn-link" onClick={this.toggleCompletion}>
            <i className={this.props.value.isCompleted ? "fa-regular fa-circle-check" : "fa-regular fa-circle"}></i>
         </button>
      );
      let inputGroup = (
         <div className="input-group">
            <div className="bg-dark border-0 input-group-text">
               {checkbox}
            </div>
            <input className="form-control bg-dark border-0 text-light"
               onChange={this.handleChange}
               value={this.props.value.text}/>
            <div className="bg-dark border-0 input-group-text">
               <button className="btn btn-sm btn-danger" type="button" 
                     onClick={this.handleDelete} aria-label="Remove list item.">
                  <i className="fa-solid fa-trash"></i>
               </button>
            </div>
         </div>
      );
      if (this.props.value.isCompleted) {
         inputGroup = (
            <del>{inputGroup}</del>
         );
      }
      return (
         <form onSubmit={this.handleSubmit}>
            {inputGroup}
         </form>
      );
   }
}

export default ListItem;