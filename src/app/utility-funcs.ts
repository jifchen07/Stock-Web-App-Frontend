export function pad2(n: number) {
  return n < 10 ? '0' + n : n;
}

export function formatCurrentTime(): string {
  let date = new Date();
  return date.getFullYear().toString() + '-' + pad2(date.getMonth() + 1) + '-' + pad2( date.getDate())
  + ' ' + pad2( date.getHours() ) + ':' + pad2( date.getMinutes() ) + ':' + pad2( date.getSeconds() );
}

export function timestampToYYYYMMDD(timestamp): string {
  let month = '' + (timestamp.getMonth() + 1);
  let day = '' + timestamp.getDate();
  let year = timestamp.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}
