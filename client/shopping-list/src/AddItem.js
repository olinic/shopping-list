import React from 'react';

class AddItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         text: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      this.setState({ 
         text: e.target.value
      });
   }

   handleSubmit(e) {
      e.preventDefault();
      const value = this.state.text;
      if (value.length > 0) {
         if (this.props.onAdd) {
            this.props.onAdd({
               id: Date.now(),
               text: this.state.text
            });
         }
         this.setState({
            text: ''
         });
      }
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-item" className="d-none">Add Item</label>
            <div className="input-group mb-3 mt-3">
               <button id="add-item" type="submit" className="btn btn-outline-secondary bg-primary text-light">
                  <i className="fa-plus fa-xl"></i> 
               </button>
               <input id="new-item" type="text" className="form-control bg-dark text-light border-primary" 
                     onChange={this.handleChange}
                     value={this.state.text}
                     placeholder="" aria-label="" aria-describedby="add-item"/>
            </div>
         </form>
      );
   }
}

export default AddItem;