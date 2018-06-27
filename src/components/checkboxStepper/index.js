/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './index.css';

class CheckboxStepper extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    getData: PropTypes.func,
    checkeAll: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state=({
      data: props.data || null,
      checkeAll:props.checkeAll,
    })
 
  }

  componentWillMount() {

  }
  componentWillUpdate(){

  }
  componentDidUpdate(){
  
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const data =nextProps.data;
    if(data){
     
      this.setState({
        ...this.state,
        data
      })
    }
   
  
  
   
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
          item.num = 1;
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
    const data = this.state.data;
    const keyId =e.currentTarget.id;
    console.log(keyId)
    data.map((item,index)=>{
      if(item.key === keyId){
        if(item.is_required !== '1'){
          if(item.num === 0){
            return
           }else{
             item.num = item.num-1;
             if( item.num===0){
              item.switch=false;
             }
           }
        }else{
          if(item.num === 1){
            item.switch=false;
           }else{
             item.num = item.num-1;
           }
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
    const data = this.state.data;
    const keyId =e.target.id;
    data.map((item,index)=>{
      if(item.key === keyId){
          item.switch=true;
          item.num= item.num+1;
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
                    'component-CheckboxStepper-checkbox-true': item.is_required === '0' && item.switch,
                    'component-CheckboxStepper-checkbox-all' : item.is_required === '0' && this.state.checkeAll,
         
                  })}>
                    <label htmlFor={item.key}>
                        <input id={item.key} checked={item.switch} type="checkbox" key={item.key} onChange={this.checkNumCLick} disabled={item.is_required === '1'?true:false}/>
                        <div className="labelname">{item.label}</div>
                        <div className="price">
                          <span>{item.amount}</span>
                        </div>
                    </label>
                    <div className="container">
                            <div className="sub" onClick={this.onSub}  id={item.key}>-</div>
                            <div className="view">{item.num}</div>
                            <div className="add" onClick={this.onAdd}  id={item.key}>+</div>
                        
                    </div>
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
