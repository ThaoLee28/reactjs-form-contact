import React, { Component } from 'react';

class RadioGroup extends Component {
  static defaultProps = {
    items: [{}],
    options: null,
    onChange: () => {},
  };
  constructor(props){
    super(props);
    this.state={
      items: this.props.items,
      options: this.props.options || this.props.items[0],
    };
  }
  optionItem = item => {
    this.setState(
      { 
        options: item
      },
      () => {
        this.props.onChange(this.state.options);
      },
    );
  };
  render(){
    return(
      <div className="flex flex-row cursor-pointer">
        {(this.state.items || []).map((item) => (
          <div 
            key={item.id} 
            className={`flex-inline flex justify-center items-center w-full py-2 focus:outline-none hover:text-red
              ${this.state.options.id === item.id
                ? 'border-red border-2 shadow-md'
                : 'border boder-solid'
              }`}
            onClick={() => this.optionItem(item)}
          >
            <span 
              className={`${this.state.options.id === item.id ? 'text-red' : '' }`}
            >
              {item.name}
            </span>
          </div>                               
        ))}
      </div>
    );
  }
}

export default RadioGroup