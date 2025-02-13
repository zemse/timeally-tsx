import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { NavbarMain } from './components/Navbar';
import { Footer } from './components/Footer';
import { OneLifeTime } from './components/OneLifeTime';
import { Dashboard } from './components/Dashboard';
import { NRT } from './components/NRT';
import { Wallet } from './components/Wallet';
import { Stakings } from './components/Stakings';
import { PromotionalRewards } from './components/PromotionalRewards';
import { Support } from './components/Support';
import { TermsAndConditions } from './components/TermsAndConditions';
import { LoadWallet } from './components/LoadWallet';
import { Nominee } from './components/Nominee';
import { Tsgap } from './components/Tsgap/Tsgap';
import { TsgapCalculator } from './components/TsgapCalculator/TsgapCalculator';
import { NewSip } from './components/Assurance/NewSip';
import { ViewSip } from './components/ViewSip/ViewSip';
import { ViewDetail } from './components/ViewSip/ViewDetail';
import { BenefitPage } from './components/Tsgap/BenefitPage/BenefitPage';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/1lifetime" exact component={OneLifeTime} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/nrt" exact component={NRT} />
          <Route path="/wallet" exact component={Wallet} />
          <Route path="/stakings" component={Stakings} />
          <Route path="/rewards" component={PromotionalRewards} />
          <Route path="/support" component={Support} />
          <Route path="/terms" component={TermsAndConditions} />
          <Route path="/load-wallet" component={LoadWallet} />
          <Route path="/nominee" component={Nominee} />
          <Route path="/tsgap" component={Tsgap} />
          <Route path="/calculate" component={TsgapCalculator} />
          <Route path="/new" component={NewSip} />
          <Route path="/view/:staker" component={ViewSip} />
          <Route path="/view-detail/:staker" component={ViewDetail} />
          <Route path="/benefits/:staker" component={BenefitPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
