import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import DatePicker  from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
       
        this.state={
            listDoctors:[],
            selectedDoctor:{},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }  
    componentDidUpdate(prevProps,prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
           }
         if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
         }  
        //    if(prevProps.language !== this.props.language){
        //         let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
        //         this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }   
    buidDataInputSelect = (inputData) =>{
  
        let result = []; 
        let {language}= this.props;
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi =`${item.lastName} ${item.firstName}`;
                let labelEn =`${item.firstName} ${item.lastName}`
    
                object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
                object.value= item.id;
                result.push(object)
            })
           
        }
        return result;
    } 
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
       
    }
    handleOnChangeDatePicker =(date)=>{
        this.setState({
            currentDate: date[0] // mảng trả về arr, lấy phần tử đầu tiền của arr
        })
       
    }
    render() {
         console.log("check doctor schedule state", this.state)
        let {rangeTime} = this.state;
        let {language} = this.props;
        return (
           <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                             value={this.state.selectedDoctor}
                             onChange={this.handleChangeSelect}
                             options={this.state.listDoctors}                           
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}  
                            minDate={new Date()}    // lấy ngày hiện tại, tắt chọn ngày quá khứ                
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item,index)=>{
                                    return(
                                        <button className='btn btn-schedule' key={index}>
                                            {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                        <button className='btn btn-primary btn-save-schedule'>
                            <FormattedMessage id="manage-schedule.save"/>
                        </button>
                        </div>
                       
                    </div>
                </div>
           </div>
              
          
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime:()=>dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
