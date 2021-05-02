import React from "react";
import 'react-circular-progressbar/dist/styles.css';
import Tooltip from '@material-ui/core/Tooltip';

function Tooltipel (props) {
  const {arrow, text, html} = props
  return <Tooltip arrow={true} title={text} aria-label='Tooltip'>
        <>  
        {html}
        </>
    </Tooltip>
}
export default Tooltipel