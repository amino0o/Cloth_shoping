import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component'
import { Switch ,Route} from 'react-router-dom'

import ShopPage from './pages/shoppage/shoppage.component'
import signInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component'
import Header from './components/header/header.component.jsx'
import { auth , createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount(){
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser : {
                            id : snapShot.data(),
                            ...snapShot.data()
                        }
                    })
                    console.log(this.state)
                })
            }
            this.setState({ currentUser : userAuth})
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={signInAndSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;