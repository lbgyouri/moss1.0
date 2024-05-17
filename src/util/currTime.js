function getCurrentDate() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  return year + "年" + month + "月" + day + '日';
}
export default getCurrentDate