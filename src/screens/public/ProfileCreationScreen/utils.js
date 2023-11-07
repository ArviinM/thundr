export const monthNameToNumber = monthName => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    April: '04',
    May: '05',
    June: '06',
    Jul: '07',
    Aug: '08',
    Sept: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  return months[monthName] || '';
};
