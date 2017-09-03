import React,{Component} from 'react';
import './tech.css'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Notification } from 'react-notification';
import Offline from 'offline-js';


class TECH extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      posts:[],
      isLoaded:false,
      isOffline:false,
      isOnline:true,
      dismissAfter:2000
    };
    this.hideIndicator = this.hideIndicator.bind(this);
    this.showIndicator = this.showIndicator.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener('offline', this.showIndicator,false)
    window.removeEventListener('online',this.hideIndicator,false)
  }
  componentWillMount() {
    console.log('willmount is working')
    if(navigator.onLine){
      this.setState({isOffline:false, isOnline:true})
    }else{
      this.setState({isOffline:true, isOnline:false})
    }
  }
  componentDidMount() {
    window.addEventListener('offline',this.showIndicator)
    window.addEventListener('online',this.hideIndicator)
    var httpHeaders = {
      'Accept':'application/json',
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Bearer 3b763bbb4cab972a8cabb0fafcc2d2ce7d3f3d6d1f2645c9058d9fa48497941d',
      'Host':'api.producthunt.com'
    }
    const myHeaders = new Headers(httpHeaders);
    const fetchAPI = async() => {
      let response = await fetch('https://api.producthunt.com/v1/categories/tech/posts',{
        method:'GET',
        headers:myHeaders,
        mode:'cors',

      })
      return await response.json()
    }
    fetchAPI()
    .then(data => this.setState({posts:data.posts ,isLoaded:true}))
    .then(() => localStorage.setItem('techposts',JSON.stringify(this.state.posts)))
    .catch(err => {
        this.setState({posts:JSON.parse(localStorage.getItem('techposts')),isLoaded:true})
    })

  }

    hideIndicator(){
      if(this.refs.loaderRef){
            this.setState({isOffline:false, isOnline:true})
      }
    }
    showIndicator(){
      if(this.refs.loaderRef){
        this.setState({isOffline:true, isOnline:false})
      }
    }
    getRenderDOM(value,index){
      return (
        <li key={index}>
          <img src={value.screenshot_url['300px']} />
          <h3>Title: {value.tagline}</h3>
          <h5>By {value.name}</h5>
        </li>
      )
    }
    toggleNotification(){
      this.setState({
        isOffline: !this.state.isOffline
      })
    }
    toggleNotificationOnline(){
      this.setState({
        isOnline: !this.state.isOnline
      })
    }
    render() {
        if(!this.state.posts || this.state.isLoaded === false){
          return(
            <Segment className='loaderSegment'>
              <Dimmer active>
                <Loader content='Loading' className='segmentLoader'/>
              </Dimmer>
              <Image src='/assets/images/wireframe/short-paragraph.png' />
            </Segment>
          )
        }
        return (
            <div className="tech">
              <ul>
              {this.state.posts.map(this.getRenderDOM)}
              </ul>
              <Notification
                ref='loaderRef'
                isActive={this.state.isOffline}
                message='It is Offline, but your application works'
                action='Dismiss'
                onDismiss={this.toggleNotification.bind(this)}
                dismissAfter={this.state.dismissAfter}
              />
              <Notification
                ref='loaderRef'
                isActive={this.state.isOnline}
                message='It is Online again'
                action='Dismiss'
                onDismiss={this.toggleNotificationOnline.bind(this)}
                dismissAfter={this.state.dismissAfter}
              />
            </div>
        );
    }
}

export default  TECH
