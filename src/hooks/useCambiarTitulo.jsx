import { useEffect } from "react";

export function useCambiarTitulo({title}){
  useEffect(()=>{
    document.title= `MI | ${title}`
  },)
}