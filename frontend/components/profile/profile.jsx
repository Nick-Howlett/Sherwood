import React from 'react';
import Navbar from '../navbar/navbar';
import Loading from '../loading';

class Profile extends React.Component{

    componentDidMount(){
        if(Object.entries(this.props.stocks ).length === 0 && this.props.stocks.constructor === Object){ //Code to see if an object is empty taken from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            this.props.getSearch();
        }
    }
    render(){
      if(!this.props.stocks.AAPL){
          return <Loading />
      }
      return(  
            <>
                <Navbar />
            </>
        )
    }
}   


export default Profile;