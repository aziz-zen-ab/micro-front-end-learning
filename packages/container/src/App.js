import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Progress from "./component/Progress";
import Header from './component/Header';

const MarketingLazy = lazy(() => import('./component/MarketingApp'))
const AuthLazy = lazy(() => import('./component/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
    <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth" >
                            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                        </Route>
                        <Route path="/" component={MarketingLazy} />
                    </Switch>
                </Suspense>
                <MarketingApp/>
            </div>
        </StylesProvider>
    </BrowserRouter>
    )
}