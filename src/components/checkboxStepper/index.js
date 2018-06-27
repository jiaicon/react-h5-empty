/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './index.css';

class CheckboxStepper extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    getData: PropTypes.func,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state=({
      data: props.data || null,
    })
 
  }

  componentWillMount() {

  }

  componentDidMount() {
   
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      data:nextProps.data,
    })
  }

  componentWillUnmount() {}

  checkNumCLick(e) {
    const data = this.state.data;
    const keyId =e.target.id;
    data.map((item,index)=>{
      if(item.key === keyId){
        if(item.switch){
          item.switch=false;
        }else{
          item.switch=true;
        }
      }

    })
   this.setState({
     ...this.state,
     data,
   })
   this.props.getData(data);

  }
  onSub(e){
    e.nativeEvent.stopImmediatePropagation();
    console.log(1111111111111111111)
    const data = this.state.data;
    const keyId =e.target.id;
    data.map((item,index)=>{
      if(item.key === keyId){
        if(item.num === 0){
         return
        }else{
          item.num--;
        }
      }

    })
   this.setState({
     ...this.state,
     data,
   })
   this.props.getData(data);
  }
  onAdd(e){
    console.log(13232311111111111)
    const data = this.state.data;
    const keyId =e.target.id;
    data.map((item,index)=>{
      if(item.key === keyId){
        if(item.num === 0){
          return
         }else{
           item.num++;
         }
      }

    })
   this.setState({
     ...this.state,
     data,
   })
   this.props.getData(data);
  }
  render() {
    const data =this.state.data;
    const props = {
      ...this.props,
    };
 
    return (
      <div className="component-CheckboxStepper" >
            {
              data?data.map((item,index)=>{
                const info =item;
               return(
                <div>
                  <div  className={classnames({
                    'component-CheckboxStepper-checkbox': true,
                    'component-CheckboxStepper-checkbox-false':item.is_required === '0' && !item.switch,
                    'component-CheckboxStepper-checkbox-disable': item.is_required === '1',
                    'component-CheckboxStepper-checkbox-true ': item.is_required === '0' && item.switch,
         
                  })}>
                    <label htmlFor={item.key}>
                        <input id={item.key} checked={item.switch} type="checkbox" key={item.key} onChange={this.checkNumCLick} disabled={item.is_required === '1'?true:false}/>
                        <div className="labelname">{item.label}</div>
                        <div className="price">
                          <span>{item.amount}</span>
                          <div className="container">
                            <div className="sub" onClick={this.onSub}>-</div>
                            <div className="view" onClick={this.onAdd}>{item.num}</div>
                            <div className="add" onClick={this.onAdd}>+</div>
                          </div>
                        </div>
                    </label>
                    
                  </div>
                  <div className="line1px"/>
                </div>
               )

                
              }):null
            }
      </div>
    );
  }
}


export default CheckboxStepper;
