import React from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Content from '../components/Content';

class Home extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            dogs:[],
            //dogs min will filtered version of dogs
            dogsMin:[],
            current:'',
            searchValue:'',
            navClass:"show"
        }
    }

    toggleNavClass = (condition) => {
        if(condition)
            this.setState({navClass:"hidden"});
        else
            this.setState({navClass:"show"})
    }

    chooseDog = (dog) => {
        this.setState({
            current:dog
        })
    }
    
    componentDidMount() {
        if(window.innerWidth<=800)
            this.toggleNavClass(true);
        axios.get(`https://dog.ceo/api/breeds/list/all`)
        .then(results=>{
            this.setState({
                dogs:Object.keys(results.data.message),
                dogsMin:Object.keys(results.data.message),
                current:Object.keys(results.data.message)[0]
            })
        })
        .catch(error=>console.log(error));
    }

    //https://stackoverflow.com/questions/7038575/find-element-in-array-using-regex-match-without-iterating-over-array
    //https://stackoverflow.com/questions/7735124/javascript-syntax-for-regex-using-variable-as-pattern
    searchDogs = (e) => {
        this.setState({
            searchValue:e.target.value
        }, () => {
            let matcher = new RegExp('^'+this.state.searchValue.toLowerCase(), 'g');
            let filteredDogs = this.state.dogs.filter(dog=>matcher.test(dog));
            this.setState({
                dogsMin:filteredDogs
            })
        })
    }

    render(){
        let navProps = {
            dogsMin:this.state.dogsMin,
            chooseDog:this.chooseDog,
            searchDogs:this.searchDogs,
            searchValue:this.state.searchValue,
            current:this.state.current,
            navClass:this.state.navClass
        }
        
        return(
            <>
                {this.state.current &&
                    <div className="wrapper">
                        <Nav {...navProps}/>
                        <Content navClass={this.state.navClass} toggleNavClass={this.toggleNavClass} current={this.state.current}/>
                    </div>
                }
            </>
        )
    }
}

export default Home;