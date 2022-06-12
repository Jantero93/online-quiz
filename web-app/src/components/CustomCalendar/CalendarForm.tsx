import React from 'react';

import { formatDate } from '../../utils/date';

type Props = {
  clickedDate: Date;
};

const CalendarForm = ({ clickedDate }: Props) => {
  return (
    <div className="_ColorDepth-Bg-3 d-flex justify-content-center">
      <div className="mx-5">
        <p>CalendarForm </p>
        <p>{formatDate(clickedDate, 'DD.MM.YYYY')}</p>
      </div>
      <div className="mx-5">
        <p>form</p>
      </div>
    </div>
  );
};

export default CalendarForm;
