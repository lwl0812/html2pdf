import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function addWaterMark(ctx, text, position) {
  ctx.save();
  const { x, y } = position;
  ctx.translate(x, y);
  ctx.rotate((-15 * Math.PI) / 180);
  ctx.fillStyle = 'rgba(239,236,236,0.7)';
  // 1920 的屏幕用 98px
  const font = (98 / 1920) * (x * 2);
  ctx.font = `${font}px PingFang SC`;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

async function downloadPdf(el, name) {
  // 实际占据的宽高
  const { width, height } = el.getBoundingClientRect();
  // 滚动高度
  const scrollTop = document.scrollingElement.scrollTop;
  const scale = 1; // 缩放级别

  const canvas = await html2canvas(el, {
    useCORS: true,
    background: '#fff',
    width,
    height: height + 20,
    scrollX: 0,
    scrollY: -scrollTop,
    imageTimeout: 60 * 1000, // ms
    scale: scale, // 增加缩放级别，提升画面质量
  });

  // 获取 canvas 宽高
  const { width: cWidth, height: cHeight } = canvas;

  // 添加个推水印
  const text = 'luwl luwl luwl luwl luwl luwl';
  const ctx = canvas.getContext('2d');
  const totalHeight = cHeight;
  const initY = 0 - scrollTop; // 考虑滚动
  const distanceY = 600; // 每个水印的距离
  const watermarkNums = Math.round(totalHeight / distanceY); // 水印总个数
  // 考虑高度比水印距离小时，默认添加一个以高度位置起的水印
  if (totalHeight <= distanceY) {
    addWaterMark(ctx, text, {
      x: width / 2,
      y: initY + totalHeight,
    });
  }
  // 添加多个水印
  for (let i = 0; i < watermarkNums; i++) {
    addWaterMark(ctx, text, {
      x: width / 2,
      y: initY + distanceY * (i + 1),
    });
  }

  const img = canvas.toDataURL('image/jpeg'); // 转成图片格式

  // 将图片塞到 pdf 中保存
  // pt 和 px 转化时，1pt / 1px = 0.75
  const pdfWidth = ((cWidth + 10) / scale) * 0.75;
  const pdfHeight = ((cHeight + 100) / scale) * 0.75;
  const imgWidth = pdfWidth;
  const imgHeight = (cHeight / scale) * 0.75;

  const pdf = new jsPDF({
    orientation: cWidth >= cHeight ? 'l' : 'p', // 宽比高大时，横向排版,
    unit: 'pt', // pdf 要用 pt 做单位！！
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(img, 'jpeg', 0, 0, imgWidth, imgHeight);
  pdf.save(name + '.pdf');
}

export default {
  downloadPdf,
};
