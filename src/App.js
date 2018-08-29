import React, {Component} from 'react'
import './App.css'
import {ajax} from 'rxjs/ajax'
import tOolz from 'jstoolz'
import {css} from 'emotion'

//import { map } from 'rxjs/operators';

// import logo from './logo.svg'
// import boy from './boy.svg'
// import paramita from './paramita.svg'
import nicolas from './paramita.svg'

const googleInfo = {
    'web': {
        'client_id': '1054646766627-8mvdin87ncj102qqr8kv890p7nia7oej.apps.googleusercontent.com',
        'project_id': 'winter-monolith-213714',
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://www.googleapis.com/oauth2/v3/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'client_secret': 'mbD_oNsaWuLCgVQUSXzQJW22'
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            cursos: [],
        }
    }

    componentDidMount() {
        cursosOajax$.subscribe(
            (item) => {
                this.setState({cursos: item.response})
            },
            (error) => {
                this.setState({error: error})
            },
        )
    }

    render() {
        console.log('cursos', this.state.cursos)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={'https://image.flaticon.com/icons/svg/55/55316.svg'} className="App-logo" alt="logo"/>
                    <h1 className="App-title">oajax & basic component react example</h1>
                </header>
                <CursoGrid cursos={this.state.cursos} onClickCustomHandler={alerta}/>
                <PutoModal id='modal-google-login' open={true}
                    content={<GoogleLogin clientId={googleInfo.web.client_id}/>}/>
            </div>
        )
    }
}

//aquí todas las implementaaciones por el moemnto.
const cursosOajax = () => {
    const cursosUri = 'http://5.135.185.155:8888/cursos'
    const simpleOajax$ = ajax(cursosUri)
    return simpleOajax$
}
const getOajaxSimpleGet = (uri) => ajax(uri)
const cursosOajax$ = getOajaxSimpleGet('http://5.135.185.155:8888/cursos')

function alerta(e) {
    console.log(e)
}

class CursoGrid extends Component {
    render() {
        const allElements = this.props.cursos
        //.filter( (item)=> item.hasExpired !== 'true' )
            .map((item) => {
                return <Curso key={item.id} curso={item} onClickCustomHandler={alerta}/>
            })
        return <div className="grid-container-cursos"> {allElements} </div>
    }
}

function Curso(props) {
    return <div className={'grid-item-cursos'} onClick={props.onClickCustomHandler}>
        <img src={'https://image.flaticon.com/icons/svg/753/753045.svg'} className="Avatar" alt="logo"/>
        <img src={'https://vignette.wikia.nocookie.net/chrono/images/1/1d/Magus-anim.gif/revision/latest?cb=20100609133535'} className="Avatar" alt="logo"/>
        <input type="image" className={'Avatar'} src='https://image.flaticon.com/icons/svg/831/831147.svg'/>
        <div>{props.curso.datestart}</div>
        <div>{props.curso.hasexpired}</div>
        <div>{props.curso.id}</div>
        <div>{props.curso.imgsrc}</div>
        <div>{props.curso.hasExpired}</div>
        <InscriptionGrid inscriptions={props.curso.inscriptions}/>
    </div>
}

function InscriptionGrid(props) {
    const AllElements = props.inscriptions
        .map((item) => <Inscription key={item.name} name={item.name}/>)
    return <div className="grid-container-inscritos">{AllElements}</div>
}

function iamClicked() {
    //todo stub
    return false
}

function Inscription(props) {
    const classNameWithJumpIfImClicked = 'grid-item-inscritos'.concat((iamClicked()) ? ' jump' : '')
    return <div className={classNameWithJumpIfImClicked} onClick={alerta}>
        {props.name}
        <NicolasCage/>
    </div>
}

function NicolasCage() {
    return <img src={nicolas} className="Avatar" alt="logo"/>
}


function PutoModal(props) {

    const id = props.id || tOolz.generateRandomId('putomodal')
    const uniqueModalId = 'modal-'.concat(id)
    const blockOrNothing = props.open === true ? 'block' : ''

    /**
     * Cierra el modal
     */
    function closeSelfModal() {
        const uniqueModalSelector = '#'.concat(uniqueModalId)
        const self = document.querySelector(uniqueModalSelector)
        console.log('cerrando modal', uniqueModalId)
        self.style.display = ''
    }

    const cssModal = css`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,43,54); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`
    const cssCloseButton = css `/* The Close Button */
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

    :hover,
    :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

`
    const cssModalContent = css`
    -webkit-animation: appear 3s ease 0s normal ;
    animation:         appear 3s ease 0s normal ;

    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    @-webkit-keyframes appear {
    0%{
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    60%{
        opacity: 1;
        -webkit-transform: scale3d(1,1,1);
        transform: scale3d(1,1,1);
    }
    }
    @keyframes appear {
    0%{
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }
    60%{
        opacity: 1;
        transform: scale3d(1,1,1);
    }
    }
`
    return (
        <div className={cssModal} id={uniqueModalId} style={{display: blockOrNothing}}>
            <div className={cssModalContent}>
                <div className={cssCloseButton} onClick={closeSelfModal}>X</div>
                {props.content}
            </div>
        </div>
    )
}

/**
 * Crea un componente que carga el script externo de google y se encarga del login.
 *
 * Se usa la plantilla de html localizada en
 * @see https://developers.google.com/identity/sign-in/web/
 *
 * Para implementar la carga del script externo se toma como referencia:
 * @see https://stackoverflow.com/questions/35854795/load-external-javascript-through-script-tag
 *
 * Para ver como obtener el id de aplicación de google.
 * @see https://stackoverflow.com/questions/17166848/invalid-client-in-google-oauth2
 */
class GoogleLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        tOolz.loadScript('https://apis.google.com/js/platform.js', function () {
            console.log('script de google cargado.... y ahora que')
        })
    }

    /**
     * todo: stub copypasted.
     * Callback ejecutado cuando el usuario se loggea correctamente.
     * @param googleUser {GoogleLogin}
     */
    static onSignIn(googleUser) {
        console.log('Logeado en google!!!!', )
        this.setState({loggedIn: true})
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile()
        console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName())
        console.log('Given Name: ' + profile.getGivenName())
        console.log('Family Name: ' + profile.getFamilyName())
        console.log('Image URL: ' + profile.getImageUrl())
        console.log('Email: ' + profile.getEmail())

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token
        console.log('ID Token: ' + id_token)
    };

    render() {
        return (
            <div className="google-login">
                <div className='google-login-metas'>
                    <meta name="google-signin-client_id" content={this.props.clientId}/>
                </div>
                <div className="g-signin2" data-onsuccess={GoogleLogin.onSignIn} data-theme="dark"/>
            </div>
        )
    }
}

export default App
