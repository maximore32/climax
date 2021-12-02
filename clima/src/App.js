import React, { useState,useEffect } from 'react';
import { Switch,Route,Link,useParams } from 'react-router-dom'


const Paises = () => {    
    const [paises, setPais] = useState( [] )
    function getPais() {
    fetch('https://raw.githubusercontent.com/michaelx/climate/master/climate.json')
        .then(response => response.json())    
        .then(datos => {setPais(datos)})
        
    }
  
    useEffect(() => {
      getPais()
    }, [])
  
    return ( 
       <main className="XD">        
          {paises.map(pais =>
           <div className="caja" key={pais.id}><Link to={"/ciudad/"+pais.id}>{pais.country.toUpperCase()}</Link>
           </div>)}     
        
        </main>    
    )
  } 

  const Ciudad = () => {
    const [ciudad, setCiudad] = useState( [] )    
    let parametros = useParams();
    const getCiudad = () => {    
      fetch('https://raw.githubusercontent.com/michaelx/climate/master/climate.json')
        .then(response => response.json())
        .then(datos => {setCiudad(datos)})
        .catch(err => console.log(err.message))
        
    }  
     useEffect(() => { getCiudad();     
      
     }, [])

   return (
      <>
      <main className="XD">
      {ciudad.filter((ciudad) => ciudad.id ===parseInt(parametros.id)).map((ciud,i) =>
      <div id="sec" key={i}>
         <h1 key={i}>{ciud.id}-Pais:{ciud.country}</h1>
         <h2>Ciudad:{ciud.city}</h2>         
         <div id="c">{ciud.monthlyAvg.map((cli,i)=><div className="box" key={i}><h1>Clima:</h1><p>High:{cli.high}-Low:{cli.low}-DryDays:{cli.dryDays}-SnowDays:{cli.snowDays}-Rainfall:{cli.rainfall}</p></div>)}</div>
              
      </div>
    ) }
    </main>
     
     </>
   )
  }
  
  
  
  
        
        


const App = () => (
    <div className="App">
      <header className="cabeza">
      <Link to="/"> <h1 className="h1">CliMax</h1></Link>       
        <Link to="/"> <img src="img/sol.png" alt="sol" width= "150px;" /></Link>
        
      </header>
      <Switch className="hola">
        <Route exact path="/"><Paises/></Route>
        <Route path="/ciudad/:id"><Ciudad/></Route>
      </Switch>
      <footer><small>Climax-Max-2020</small></footer>             
    </div>    
  );

  export default App;