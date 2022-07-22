import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker  from '../../../components/Input/DatePicker';
class ManagePatient extends Component {
   constructor(props){ 
        super(props);
        this.state={
            currentDate: new Date(),
        }
   }
   async componentDidMount(){
      
   }

    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.language !== prevProps.language){
           
        }     
    }
    handleOnChangeDatePicker =(date)=>{
        this.setState({
            currentDate: date[0] // mảng trả về arr, lấy phần tử đầu tiền của arr
        })
       
    }
    render() {
       
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}  
                            // minDate={yesterday}    // lấy ngày hiện tại, tắt chọn ngày quá khứ                
                            />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{width:'100%'}}>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th> 
                                <th>Age</th>
                            </tr>
                            <tr>
                                <td>Jill</td>
                                <td>Smith</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td>Eve</td>
                                <td>Jackson</td>
                                <td>94</td>
                            </tr>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>80</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );                
    }       
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
