import React from 'react';
import axios from 'axios';

class Content extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            images:[],
            number:20,
            maxColumns:4
        }
    }

    updateImages = () => {
        axios.get(`https://dog.ceo/api/breed/${this.props.current}/images`)
        .then(results=>{
            this.setState({
                images:results.data.message
            });
        })
        .catch(error=>console.log(error));
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.current !== this.props.current){
            this.updateImages();
        }
    }

    componentDidMount() {
        this.updateImages();
    }

    render(){
        let {maxColumns, number}=this.state;
        if(this.state.images.length<number){number/=2}
        let columns=[];
        //using 4 to make 4 column layout in max width
        for(let i=0; i<maxColumns; i++){
            let start=i*(number/maxColumns-1);
            let end=i*(number/maxColumns-1)+number/maxColumns;
            columns.push(
                <div key={i} className="column">
                    {this.state.images.slice(start,end).map((image,index)=><img key={index} src={image} alt={`${this.props.current}`}/>)}
                </div>
            );
        }

        return(
            <>
                {this.state.images &&
                    <div className={`content ${this.props.navClass}`}>
                        <button onClick={()=>this.props.toggleNavClass(this.props.navClass==="show")}><i className="fa fa-bars"></i></button>
                        <h2>{this.props.current}</h2>
                        <div className="row">
                            {columns}
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Content