//可以写一点可以在模版里面调用的方法。
export class Helper {
  /* * 字符串截取
   * @str 截取字符串
   * @start 开始截取位置
   * * @end 结束截取位置 */
  static happ = 'full';
  static substring = function (str: string, start: number, end: number) {
    if (end) {
      return str.substring(start, end);
    } else {
      return str.substring(start);
    }
  };
}
