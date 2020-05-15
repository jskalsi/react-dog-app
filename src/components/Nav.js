import React from 'react';

class Nav extends React.Component {
	componentDidUpdate(prevProps, prevState) {
        if(prevProps.dogsMin !== this.props.dogsMin){

        }
    }

    render(){
        return(
			<nav className={`sideNav ${this.props.navClass}`}>
				<h2>Find your next dog</h2>
				<form onSubmit={(e)=>e.preventDefault()} className="search-form">
						<input type="text" value={this.props.searchValue} onChange={this.props.searchDogs} placeholder="Search here"/>
				</form>
		
				<ul>
					{this.props.dogsMin.map(dog=>dog===this.props.current
						?<li key={dog}><button className="active" onClick={()=>this.props.chooseDog(dog)}>{dog}</button></li>
						:<li key={dog}><button onClick={()=>this.props.chooseDog(dog)}>{dog}</button></li>)}
				</ul>
			</nav>
        )
    }
}

export default Nav;