import React, { Component } from 'react';
import { Form, Field, FormSpy } from "react-final-form";
import { ReactComponent as SvgDropdown } from './svg/dropdown.svg';
import { ReactComponent as SvgAttract } from './svg/attract.svg';
import RadioGroup from './RadioGroup';
import axios from 'axios';
class FormContact extends Component {
  static defaultProps = {
    selectedFile: null,
  };

  constructor(props){
    super(props);
    this.state={
      data:[],
      selectedFile: this.props.selectedFile || [],
    };
  }

  fetchData = () => {
    const getData = () => new Promise(resolve => setTimeout(() => resolve ({
      "companyName": "ABC Company",
      "name": "Tony",
      "email": "tony@gmail.com",
      "phone": "0987654321",
      "location": {name: "USA", id: "1"},
      "budget": "not define",
      "about": "Contact",
    }), 500))
    getData().then(
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
      selectedFile: Array.from(e.target.files)
    })
  }

  fileUploadHandle = () => {
    const fd = new FormData()
    fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('http://localhost:3000/upload', fd, {
      onUploadProgress: progressEvent => {
        console.log('UpLoad Progress: ' + Math.round(progressEvent.loaded / progressEvent.total) * 100 + '%') 
      }
    })
      .then(res=>{
        console.log(res);
      });
  }

  removeDiv = () => {
    document.getElementById('upload').value = "";
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
    console.log('field:', this.state.selectedFile)
    return(
      <div className="container mx-auto shadow-md p-5 md:p-10" style={{ maxWidth: 900 }}>
        <Form
          onSubmit={this.submit}
          validate={this.validate}
          initialValues={{...this.state.data}}
          onChange={this.handleChangeForm}
          render={ ({ handleSubmit, form , submitting}) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormSpy
                subscription={{ submitSucceeded: true}}
                onChange={state=>{
                  if (state.submitSucceeded) {
                    form.reset();
                  }
                }}
              />
              <div className="row md:flex">
                <div className="col w-full md:w-1/2 md:mr-2">
                  <Field name="companyName">
                    {({ input }) => (
                      <div className="mb-5">
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
                </div>
                <div className="col w-full md:w-1/2 md:ml-2">
                  <Field name="name">
                    {({ input }) => (
                      <div className="mb-5">
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
              </div>
              <div className="row md:flex">
                <div className="col w-full md:w-1/2 md:mr-2">
                  <Field name="email">
                    {({ input, meta }) => (
                      <div className="mb-5">
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
                </div>
                <div className="col w-full md:w-1/2 md:ml-2">
                  <Field name="phone">
                    {({ input }) => (
                      <div className="mb-5">
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
              </div>
              <div className="row md:flex">
                <div className="col w-full mb-5">
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
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className="row md:flex">
                <div className="col w-full mb-5">
                  <label className="block mb-2">What is your budget?</label>
                  <div className="relative">
                    <Field 
                      name="budget" 
                      component="select"
                      className="
                        cursor-pointer block w-full border border-solid h-12 
                        bg-grey-lighter focus:outline-none 
                        px-4 py-3 appearance-none"
                    >
                      <option value="not define">Not define</option>
                      <option value="up to $15,000">Up to $15,000</option>
                      <option value="up to $30,000">Up to $30,000</option>
                      <option value="up to $60,000">Up to $60,000</option>
                      <option value="up to $100,000">Up to $100,000</option>
                      <option value="more than $100,000">More than $100,000</option>
                    </Field>
                    <SvgDropdown 
                      className="absolute pin-r pin-t mr-2 pointer-events-none" 
                      style={{ top: `50%`, transform: `translateY(-50%)` }}
                    />
                  </div>
                </div>
              </div>
              <div className="row md:flex">
                <div className="col w-full mb-5">
                  <label className="block mb-2">Tell us about your project</label>
                  <div className="relative">
                    <Field
                      name="about"
                      component="textarea"
                      className="block border border-solid bg-grey-lighter w-full focus:outline-none px-4 py-3"
                      rows={5}
                    >
                    </Field>
                    <label htmlFor="upload">
                      <SvgAttract 
                        className="absolute pin-r pin-t m-2 cursor-pointer" 
                      /> 
                    </label>
                    <Field name="upload_file">
                      {({ input }) => (
                        <input 
                          {...input} 
                          type="file"
                          id="upload"
                          className="hidden"
                          multiple
                          onChange={this.handleselectedFile}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <ul className="list-reset mb-5">
                {(this.state.selectedFile).map((file,index) => (
                  <li 
                    key={index}
                    className="bg-grey-lighter my-1 py-2 px-4"
                  >
                    <div className="flex items-center">
                      <div className="flex-auto">{file.name}</div>
                      <div className="flex-none">{(file.size)/1000 + ' KB'}</div>
                      <button
                        type="button"
                        className="text-red flex-none ml-5 focus:outline-none"
                        onClick={() => {
                          this.setState(state => {
                            const removeItem = state.selectedFile.filter(e => e.lastModified !== file.lastModified)
                            return {
                              selectedFile: removeItem
                            }
                          })
                        }}
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="row flex justify-center item-center">
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