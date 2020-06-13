import React, { useState } from 'react'

import { Select } from "@material-ui/core";

export const InputX = ({ unit,  handleChangeUnit, }) => {


  return (
    <div>
      <Select value={unit} onChange={handleChangeUnit} name="unit">
        <option value={'px'}>px</option>
        <option value={'in'}>in</option>
        <option value={'cm'}>cm</option>
      </Select>
    </div>
  );
}

