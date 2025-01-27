import Effect from './Effect';

function textEffect({ text, duration }: { text: string; duration: number }) {
  const textHeight = 300;
  const showText = new Effect('textEffect');
  showText.fadeInDuration = 1;
  showText.fadeOutDuration = 1;
  showText.duration = duration || 5;
  showText.renderFx = (ctx, x, y, opacity) => {
    const minHeight = Math.min(textHeight, y);
    const textMeasure = ctx.measureText(text);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.font = `bold ${48 * 1}px Galmuri9`;
    const bgOpacityHex = Math.ceil(opacity * 255 > 50 ? 50 : opacity * 255)
      .toString(16)
      .padStart(2, '0');
    const opacityHex = Math.ceil(opacity * 255)
      .toString(16)
      .padStart(2, '0');
    ctx.fillStyle = '#000000' + bgOpacityHex;
    ctx.fillRect(0, 0, x * 2, y * 2);
    ctx.strokeStyle = 'ffffff' + opacityHex;
    ctx.fillStyle = '#000000' + opacityHex;
    ctx.strokeText(text, x - textMeasure.width / 2, minHeight);
    ctx.fillText(text, x - textMeasure.width / 2, minHeight);
  };
  return showText;
}

export default textEffect;
