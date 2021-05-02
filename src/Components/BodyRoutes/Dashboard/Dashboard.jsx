import React, { useState } from 'react'
import User from '../../User/User'
import './Dashboard.css'
import { HashLink as Link } from 'react-router-hash-link';
import Element from '../../Themebtn/Element';
import { links } from '../Arrayvariables';
import ReactTimeAgo from 'react-time-ago'
import Dropdown from '../../Dropdown/Dropdown';
import Dropdownuser from '../../Dropdown/Dropdownuser';
import Nav from '../Nav/Nav';
import Motiondiv from '../../Motiondiv/Motiondiv';
import Highlightercomp from '../../Highlighter/Highlightercomp';

function Dashboard(props) {
  const {keyword, setKeyword, html} = props
  const [dropdown, setDropdown] = useState(false)
 
  return <Motiondiv html={
  <><div className="dashboard">
    <div id="top"></div>
    <Nav dropdown={dropdown} setDropdown={setDropdown} keyword={keyword} setKeyword={setKeyword} links={links} />
    {html}
  </div>
  </>
  }/>
}
export default Dashboard