var data = require('./data');
var React = require('react');
var ReactDOM = require('react-dom');



class App extends React.Component {
    render(){
        return(
        <div>
            <h1>Ov-fiets Radar</h1>
            <Searcharea />
        </div>
        )
    }
}

class Searcharea extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: '', rowarray: [], result:null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    handleChange(event){
        const input = event.target.value
        const rowarray = LIST.filter(function(obj){
            if (obj.name.toLowerCase().search(input.toLowerCase()) >= 0 ){
                return obj};
        })
        this.setState({rowarray:rowarray, value:input});
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault;

    }
    componentDidMount(){
        this.nameInput.focus();
    }
    componentWillMount(){
        this.fetchResult();
    }

    fetchResult(res){
        
        if (res){
            this.setState({result:res});
        }
            // console.log("res = " + res);
        
        
    }

    sendRequest(loc){
        if(this.handleClick){
            console.log("loc = "+loc);
            const theUrl ='http://www.ovfietsradar.nl/api/rental_log/?location_code='+loc;
            httpGetAsync(theUrl,this.fetchResult);
        }
    }

    handleClick(e){
        console.log(this.state.rowarray[e.target.id].location_code);
        // const newresult = this.state.rowarray[e.target.id].name;
        this.sendRequest(this.state.rowarray[e.target.id].location_code);
        this.setState({rowarray:[]});
    }


    render(){
        return(
            <div>
                
                <form onSubmit={this.handleSubmit}>
                <p>Searching : {this.state.value}</p>
                <input type="text" ref={(input) => { this.nameInput = input; }} 
                     onChange={this.handleChange} value={this.state.value} placeholder="type something"/>
                </form>
                
                <Rows content={this.state.rowarray} onClick={this.handleClick}/>
                <Result rcontent={this.state.result} />

            </div>
        )
    }
}

function Result(props){

      
    if(typeof props.rcontent == 'string'){
        const json = JSON.parse(props.rcontent);
    return (<ul style={{listStyleType:'none', padding:'0'}}>{json.map((row, id) => <li key={row.src_fetchtime} id={i}>
                           {formatDate(row.src_fetchtime)},
                        <strong> {row.bike_qty}</strong> </li>)}</ul>);
    }else{return null}
       
}

function formatDate(str){
        
        const date = new Date(str*1000).toLocaleDateString('en-GB',{weekday: 'short', month: 'short', day: 'numeric'});
        const time = new Date(str*1000).toLocaleTimeString('en-GB',{hour: '2-digit', minute:'2-digit'});
        return (date+" "+time);
    };

class Rows extends React.Component{
    // see: https://stackoverflow.com/questions/22639534/pass-props-to-parent-component-in-react-js
    
    render(props){
        return(
            <div>
                <ul style={{listStyleType:'none', padding:'0'}}>
                    {this.props.content.map((row, i) => <li key={row.location_code} id={i} onClick={this.props.onClick} >{row.name}, 
                        <strong> {row.current_amt} </strong>bikes available</li>)} 
                </ul>
            </div>
        );
    }
}



class Submitbutton extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:'...'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({name:'GO'});
    }

    render(){
        return(<button type="button" style={{background:'rgb(100,255,255)',float:'right'}} value="click" onClick={this.handleClick}>{this.state.name}</button>);
    }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}


ReactDOM.render(<App />,document.getElementById('app'));
