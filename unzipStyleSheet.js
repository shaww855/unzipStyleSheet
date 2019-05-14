/**
 * 将样式表中的样式插入对应元素中
 * @param {String} html 包含单个style的html标记文本
 */
function unzipStyleSheet(html) {
  // 创建Dom
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="unzip-style-sheet" style="display: none">' + html + '</div>')
	// 遍历样式表
	let classList = document.styleSheets
  Array.prototype.forEach.call(document.styleSheets[classList.length - 1].rules, function (classObj, i) {
    var elements = document.querySelectorAll(classObj.selectorText);
    // 遍历选择器
    Array.prototype.forEach.call(elements, function (el, j) {
      // 获取元素样式
      var originStyle = el.getAttribute('style'),
        // 切割样式文本
        classArray = classObj.cssText.split(' '),
        // 样式转style
        class2Style = classArray.slice(2, classArray.length - 1).join('')
      if (originStyle != null) {
        // attr 中style不为null，那就得加上原来的
        class2Style = originStyle + class2Style
      }
			// 覆盖style
      el.setAttribute('style', class2Style)
    });
  })
  var style = document.querySelector('#unzip-style-sheet style')
  // 移除style
  style.parentNode.removeChild(style);
  var dom = document.querySelector('#unzip-style-sheet'),
		result = dom.innerHTML
  // 移除DOM
  dom.parentNode.removeChild(dom);
  // 返回
  return result
}
