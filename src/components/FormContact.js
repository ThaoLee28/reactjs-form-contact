import React, { Component } from 'react';
import { Form, Field, FormSpy } from "react-final-form";
import { ReactComponent as SvgDropdown } from './svg/dropdown.svg';
import { ReactComponent as SvgAttract } from './svg/attract.svg';
import RadioGroup from './RadioGroup';
class FormContact extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      value:'',
      selectedFile: null,
    };
  }
  fetchData = () => {
    const fData = new Promise(resolve => setTimeout(() => resolve ({
      "companyName": "ABC Company",
      "name": "Tony",
      "email": "tony@gmail.com",
      "phone": "0987654321",
      "location": {name: "USA", id: "1"},
      "budget": "not define",
      "about": "Contact",
    }), 500))
    fData.then(
      results => {
        console.log(results)
        this.setState({
          data: results
        })
      }
    )
  }
  componentDidMount() {
    this.fetchData();
  }
  handleselectedFile = e => {
    this.setState({
      selectedFile: e.target.files[0],
    })
  }
  submit = values => {
    console.log(values)
  }
  validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  }
  render() {
    console.log(this.state.selectedFile)
    return(
      <div className="container mx-auto mt-5 shadow-md p-5" style={{ maxWidth: 900 }}>
        <Form
          onSubmit={this.submit}
          validate={this.validate}
          initialValues={{...this.state.data}}
          onChange={this.handleChangeForm}
          render={ ({ handleSubmit, form , submitting}) => (
            <form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ submitSucceeded: true}}
                onChange={state=>{
                  if (state.submitSucceeded) {
                    form.reset();
                  }
                }}
              />
              <div className="flex flex-wrap my-3">
                <Field name="companyName">
                  {({ input }) => (
                    <div className="flex-1 mx-5">
                      <label 
                        className="block mb-2"
                      >
                        Your company or project name
                      </label>
                      <input 
                        {...input} 
                        type="text"
                        className="block w-full bg-grey-lighter border border-solid rounded py-3 px-4 mb-3 leading-tight 
                        focus:outline-none focus:bg-white focus:border-blue"
                      />
                    </div>
                  )}
                </Field>
                <Field name="name">
                  {({ input }) => (
                    <div className="flex-1 mx-5">
                      <label 
                        className="block mb-2"
                      >
                        What is your name?
                      </label>
                      <input 
                        {...input} 
                        type="text"
                        className="block w-full bg-grey-lighter border border-solid rounded py-3 px-4 mb-3 leading-tight
                        focus:outline-none focus:bg-white focus:border-blue"
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className="flex flex-wrap my-3">
                <Field name="email">
                  {({ input, meta }) => (
                    <div className="flex-1 mx-5">
                      <label 
                        className="block mb-2"
                      >
                        What is your email address? 
                        <span className="text-red"> *</span>
                      </label>
                      <input 
                        {...input} 
                        type="text"
                        className="block w-full bg-grey-lighter border border-solid rounded py-3 px-4 mb-3 leading-tight
                        focus:outline-none focus:bg-white focus:border-blue"
                      />
                      {meta.error && meta.touched && <span className="text-red">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="phone">
                  {({ input }) => (
                    <div className="flex-1 mx-5">
                      <label 
                        className="block mb-2"
                      >
                        What is your phone number?
                      </label>
                      <input 
                        {...input} 
                        type="text"
                        className="block w-full bg-grey-lighter border border-solid rounded py-3 px-4 mb-3 leading-tight
                        focus:outline-none focus:bg-white focus:border-blue"
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className="my-3 mx-5">
                <label className="block mb-2">Which location is closest to you?</label>
                <Field name="location">
                  {({ input }) => (
                    <RadioGroup
                      items= {[
                        { name: 'USA', id: 1 },
                        { name: 'Europe', id: 2 },
                        { name: 'Singapore', id: 3 },
                        { name: 'Orther', id: 4 },
                      ]}
                      onChange={input.onChange}
                      optionItem={input.value.name}
                    />
                  )}
                </Field>
              </div>
              <div className="relative my-3 mx-5">
                <label className="block mb-2">What is your budget?</label>
                <Field 
                  name="budget" 
                  component="select"
                  className="cursor-pointer block w-full border border-solid h-12 bg-grey-lighter focus:outline-none px-4 py-3 appearance-none"
                >
                  <option value="not define">Not define</option>
                  <option value="up to $15,000">Up to $15,000</option>
                  <option value="up to $30,000">Up to $30,000</option>
                  <option value="up to $60,000">Up to $60,000</option>
                  <option value="up to $100,000">Up to $100,000</option>
                  <option value="more than $100,000">More than $100,000</option>
                </Field>
                <SvgDropdown className="absolute pin-r" style={{ top: `50%`, transform: `translateX(-50%)` }}/>
              </div>
              <div className="relative my-3 mx-5">
                <label className="block mb-2">Tell us about your project</label>
                <Field
                  name="about"
                  component="textarea"
                  className="block border border-solid bg-grey-lighter w-full focus:outline-none px-4 py-3"
                  rows={5}
                >
                </Field>

                <label htmlFor="upload">
                  <SvgAttract 
                    className="absolute pin-t pin-r mr-2" style={{ top: `25%`, transform: `translateX(-25%)` }}
                  /> 
                </label>
                <Field 
                  name="upload_file"
                  component="input"
                  type="file"
                  id="upload"
                  className="hidden"
                  onChange={this.handleselectedFile}
                >
                </Field>
              </div>
              <div className="my-3 mx-5 flex justify-center item-center">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="bg-red text-white font-bold py-2 px-4 rounded text-center focus:outline-none"
                >
                  Send message
                </button>
                <button 
                  type="button" 
                  onClick={form.reset} 
                  className=" ml-2 bg-grey text-black font-bold py-2 px-4 rounded text-center focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
export default FormContact