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
        cursosOajax().subscribe(
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
                <PutoModal open={true} content={<div>Esto va a molar animate pidgeon ...</div>}/>
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
        <PutoModal open={true} id={props.name} content={<div> y se le puede meter un elemento</div>}/>
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

export default App
