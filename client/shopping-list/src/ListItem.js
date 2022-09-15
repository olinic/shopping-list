import React from 'react';

class ListItem extends React.Component {

   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      if (this.props.onChange) {
         this.props.onChange({
            id: this.props.value.id,
            text: e.target.value
         });
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      if (this.props.onReturn) {
         this.props.onReturn();
      }
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <div className="input-group">
               <div className="bg-dark border-secondary input-group-text">
                  <input className="bg-dark border-primary form-check-input mt-0" type="checkbox" value=""
                        aria-label="Checkbox for list item." disabled/>
               </div>
               <input className="form-control bg-dark border-secondary text-light"
                  onChange={this.handleChange}
                  value={this.props.value.text}/>
            </div>
         </form>
      );
   }
}

export default ListItem;