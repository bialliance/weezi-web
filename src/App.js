import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Home from './views/Home/Home'
// import Documentation from './views/Documentation/Documentation'
// import Community from './views/Community/Community'
import Layout from './route/Layout';
import './App.scss'
import { YMInitializer } from 'react-yandex-metrika';


function App() {
    return (
        <BrowserRouter>
            {/* <SmoothScroll> */}
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route path="/documentation" component={Documentation} /> */}
                        {/* <Route path="/community" component={Community} /> */}
                        <Redirect to="/" />
                    </Switch>
                </Layout>
            {/* </SmoothScroll> */}
            <YMInitializer accounts={[86215189]} options={{ webvisor: true }} />
        </BrowserRouter>
    )
}

export default App
