import React from 'react'
import { Tooltip } from 'antd'
import classes from './SectionClientName.module.css'
const SectionClientName = ({ sectionName }) => {
  return (
    <div className={classes.nameHeader} style={{ marginBottom: '1rem' }}>
        <div className={classes.avatar}>
            {sectionName.clientName.charAt(0).toUpperCase()}
        </div>

        <Tooltip placement="top" title={sectionName.clientName}>
            <h3 className={classes.clientName}>{sectionName.clientName}</h3>
        </Tooltip>
    </div>
  )
}

export default SectionClientName
