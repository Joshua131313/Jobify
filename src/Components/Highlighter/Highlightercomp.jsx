import React, { useContext } from 'react'
import Highlighter from "react-highlight-words";
import { ContextApp } from '../../ContextAPI';
import './Highlightercomp.css'
function Highlightercomp(props) {
  const {keyword} = useContext(ContextApp)
  const {text} = props
  const searchwords = keyword.split(/\s/).filter(word=>word)
  
  return  <Highlighter
  highlightClassName="highlighter"
  searchWords={searchwords}
  highlightStyle={{fontWeight: 'bold'}}
  autoEscape={true}
  textToHighlight={text}
/>
}
export default Highlightercomp