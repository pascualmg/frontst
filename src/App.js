import React, { Component } from 'react'
import './App.css'
import { ajax } from 'rxjs/ajax'
//import { map } from 'rxjs/operators';

import USER_ROLES from './USER_ROLES.js'
import logo from './logo.svg'
import boy from './boy.svg'
import paramita from './paramita.svg'
import nicolas from './nicolas.svg'

// function App(props) {return <PutoModal content={"cosa"} /> }

class App extends Component {
    constructor(props) {
      window.userRoles = USER_ROLES;
      console.log(USER_ROLES)
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            cursos: [],
        }
    }
    componentDidMount() {
        cursos().subscribe(
            (item) => {this.setState({cursos: item.response})},
            (error) => {this.setState({error: error})},
        )


    }
    render() {
        console.log('cursos', this.state.cursos)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={'https://image.flaticon.com/icons/svg/55/55316.svg'} className="App-logo" alt="logo" />
                    <h1 className="App-title">oajax & basic component react example</h1>
                </header>
                <CursoGrid cursos={this.state.cursos} onClickCustomHandler={alerta}/>
            </div>
        )
    }
}

//aquí todas las implementaaciones por el moemnto.
const cursos = () => {
    const cursosUri = 'http://5.135.185.155:8888/cursos'
    const simpleOajax$ = ajax(cursosUri)
    return simpleOajax$
}

function alerta(e){console.log(e)}

class CursoGrid extends Component {
    render(){
        const allElements = this.props.cursos
        //.filter( (item)=> item.hasExpired !== 'true' )
            .map((item)=>{return <Curso key={item.id} curso={item} onClickCustomHandler={alerta}/>})

 	return <div className="grid-container-cursos" > {allElements} </div>
    }	
}

function Curso(props){
    return <div className={'grid-item-cursos'} onClick={props.onClickCustomHandler}>
       <img src={'https://image.flaticon.com/icons/svg/753/753045.svg'} className="Avatar" alt="logo" />
        <input type="image" className={'Avatar'} src= 'https://image.flaticon.com/icons/svg/831/831147.svg' />
        <div>{props.curso.datestart}</div>
        <div>{props.curso.hasexpired}</div>
        <div>{props.curso.id}</div>
        <div>{props.curso.imgsrc}</div>
        <div>{props.curso.hasExpired}</div>
        <InscriptionGrid inscriptions={props.curso.inscriptions}/>
    </div>
}

function InscriptionGrid(props){
    const AllElements = props.inscriptions
        .map ( (item) => <Inscription key={item.name }name={item.name}/> )
    return <div className="grid-container-inscritos">{AllElements}</div>
}

function iamClicked(){
  //todo stub
return  false;
}

function Inscription(props){
    const classNameWithJumpIfImClicked = "grid-item-inscritos".concat(  (iamClicked())?" jump":"")

    return <div className={ classNameWithJumpIfImClicked } onClick={alerta}>
    {props.name}
      <NicolasCage />
       <PutoModal content={<div> y se le puede meter un elemento</div>}/>
    </div>
}

function NicolasCage() {
       return <img src={nicolas} className="Avatar" alt="logo" />
}

function PutoModal(props){
  const style  = <style type="text/css"> 
  </style>;

  const modalHtml =  <div className="modal">
    <div className="modal-content">
    <div className="modal-close">X</div>   
      contenido: {props.content}
    </div>
  </div>

    return <div className="superContainer">{style}{modalHtml}</div>;
}

export default App
