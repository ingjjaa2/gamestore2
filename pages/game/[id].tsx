import React from 'react'


export async function getStaticPaths(){

    // aqui va la funcion que saca todos los juegos 


    return {
        paths:[
            {params:{id:'1'}}
        ],
        fallback:true,
    }
}


export async function getStaticProps(context:any){
    const { params } = context
    const { id } = params
    return {
        props:{id}
    }
}



const Index = (props:any) => {

    console.log(props);

    return (
        <div>
            Esta en Game
        </div>
    )
}

export default Index
