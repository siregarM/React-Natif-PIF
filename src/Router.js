import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Signin from './containers/auth/Signin';
import Signup from './containers/auth/Signup';
import Menu from './containers/Menu';
import PostCreate from './containers/post/PostCreate';
import PostEdit from './containers/post/PostEdit';
import PostList from './containers/post/PostList';
import ArtikelCreate from './containers/artikel/ArtikelCreate';
import ArtikelEdit from './containers/artikel/ArtikelEdit';
import ArtikelList from './containers/artikel/ArtikelList';
import UploadList from './containers/upload/UploadList';
import requireAuth from './containers/auth/requireAuth';
import requireNotAuth from './containers/auth/requireNotAuth';

const RouterComponent = () => (
  <Router
    sceneStyle={{ paddingTop: 65, backgroundColor: '#edecec' }}
    navigationBarStyle={styles.navigationBarStyle}
    titleStyle={{ color: '#4d4d4d' }}
  >
    <Scene key="auth">
      <Scene key="signin" component={requireNotAuth(Signin)} title="Please Sign in" />
      <Scene key="signup" component={requireNotAuth(Signup)} title="Please Sign up" />
    </Scene>
    <Scene key="menu">
      <Scene 
        key="home" 
        component={requireAuth(Menu)} 
        title="Menu" 
        leftTitle="Sign out"
        onLeft={() => { firebase.auth().signOut(); Actions.auth(); }}
      />
    </Scene>
    <Scene key="upload">
        <Scene
          key="uploadlist"
          component={requireAuth(UploadList)}
          title="Upload" 
          leftTitle="Sign out"
          onLeft={() => { firebase.auth().signOut(); Actions.auth(); }}
        />
    </Scene>
    <Scene key="artikel">
      <Scene
        key="artikelList"
        component={requireAuth(ArtikelList)}
        title="Restaurant"
        leftTitle="Sign out"
        onLeft={() => { firebase.auth().signOut(); Actions.auth(); }}
        onRight={() => Actions.artikelCreate()}
        rightTitle="Add"
      />
      <Scene key="artikelCreate" component={requireAuth(ArtikelCreate)} title="Create Restaurant" />
      <Scene key="artikelEdit" component={requireAuth(ArtikelEdit)} title="Edit Restaurant" />
    </Scene>
    <Scene key="post">
      <Scene
        key="postList"
        component={requireAuth(PostList)}
        title="Makanan"
        leftTitle="Sign out"
        onLeft={() => { firebase.auth().signOut(); Actions.auth(); }}
        onRight={() => Actions.postCreate()}
        rightTitle="Add"
      />
      <Scene key="postCreate" component={requireAuth(PostCreate)} title="Create Makanan" />
      <Scene key="postEdit" component={requireAuth(PostEdit)} title="Edit Makanan" />
    </Scene>
  </Router>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;
