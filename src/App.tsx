import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, search, person, addCircleOutline } from "ionicons/icons";

import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Create from "./pages/Create";

import "./styles/global.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabaseClient";
import AuthForm from "./components/custom/AuthForm";
import { Toaster } from "./components/ui/toaster";

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
// import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then((sessionData) => {
      setSession(sessionData.data.session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <Toaster />
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route
              exact
              path="/"
              render={() => {
                return session ? <Redirect to={"/home"} /> : <AuthForm />;
              }}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/explore">
              <IonIcon aria-hidden="true" icon={search} />
              <IonLabel>Explore</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/create">
              <IonIcon aria-hidden="true" icon={addCircleOutline} />
              <IonLabel>Create</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/profile">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
