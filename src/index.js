
import  ReactDOM  from 'react-dom/client';

import  App  from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { HashRouter } from 'react-router-dom';
import './index.css'
import 'jquery/dist/jquery.min.js'


let root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
<App/>
</HashRouter>




)